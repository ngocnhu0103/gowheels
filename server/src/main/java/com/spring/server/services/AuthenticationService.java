package com.spring.server.services;

import com.spring.server.data.AuthenticationRequest;
import com.spring.server.data.RegisterRequest;
import com.spring.server.data.ResponseAuth;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.*;
import com.spring.server.repositories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final JavaMailSender mailSender;

    public ResponseEntity<ResponseObject> register(RegisterRequest req, String siteURL) throws UnsupportedEncodingException, MessagingException {

        var userFound = userRepository.findByEmail(req.getEmail());

        if(userFound.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseObject.builder().statusCode(401).message("Email đã được đăng ký").data("").build());
        }

        if(!req.getPassword().equals(req.getRepeatPassword())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseObject.builder().statusCode(401).message("Mật khẩu không khớp").data("").build());
        }

        UUID uuid = UUID.randomUUID();
        var user = UserModel.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .fullName(req.getFullName())
                .role(Role.USER)
                .verificationCode(uuid.toString())
                .enabled(false)
                .build();

        try {
            userRepository.save(user);

            sendVerificationEmail(user, siteURL);

            var jwtToken = jwtService.generateToken(user);
            var data = ResponseAuth.builder().token(jwtToken).user(user).build();
            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("Đăng ký thành công").data(data).build());
        }catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    public ResponseEntity<ResponseObject> login(AuthenticationRequest req){

        System.out.println(req);
                Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        req.getEmail(),
                        req.getPassword()
                ));
        System.out.println(authentication);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                UserDetails user = (UserDetails) authentication.getPrincipal();
//                var user = userRepository.findByEmail(req.getEmail());
                System.out.println(user);
                if(user == null){
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            ResponseObject.builder().statusCode(404).message("Email chưa được đăng ký").data("").build()
                    );
                }

                if(!passwordEncoder.matches(req.getPassword(),user.getPassword())){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            ResponseObject.builder().statusCode(401).message("Mật khẩu không đúng").data("").build()
                    );
                }




                var jwtToken = jwtService.generateToken(user);
                var data = ResponseAuth.builder().token(jwtToken).user(user).build();
                return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("Đăng nhập thành công").data(data).build());


    }

    public void sendVerificationEmail(UserModel user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "ngocnhu010301@gmail.com";
        String senderName = "Bike Bike";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY EMAIL</a></h3>"
                + "Thank you,<br>"
                + "Bike Bike.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getEmail());
        String verifyURL = siteURL + "/api/v1/auth/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public ResponseObject verify(String verificationCode) {
        var user = userRepository.findByVerificationCode(verificationCode)
                .orElseThrow();

        user.setVerificationCode(null);
        user.setEnabled(true);
        userRepository.save(user);

        return ResponseObject
                .builder()
                .message("Verify email successfully")
                .build();
    }
}
