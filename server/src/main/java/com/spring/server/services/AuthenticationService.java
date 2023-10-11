package com.spring.server.services;

import com.spring.server.data.AuthenticationRequest;
import com.spring.server.data.RegisterRequest;
import com.spring.server.data.ResponseAuth;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.*;
import com.spring.server.repositories.ImageRepository;
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
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final ImageRepository imageRepository;

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

        var avatar = Image.builder().url("https://firebasestorage.googleapis.com/v0/b/gowheels-b0d13.appspot.com/o/files%2FuserDefault.png_5120?alt=media&token=09d7c9ae-3b20-482a-9adf-45f0da7e807d&_gl=1*1jyyhh6*_ga*MTk4NTg3MTE0MS4xNjk0ODY1NjA1*_ga_CW55HF8NVT*MTY5NzAzMzQ5NS4zLjEuMTY5NzAzMzUzOC4xNy4wLjA.").build();


         Random r = new Random();
         Integer random = r.nextInt(999999);
         var user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .fullName(req.getFullName())
                 .createdAt(new Date())
                .avatar(avatar)
                 .gender(req.getGender())
                .role(Role.USER)
                .verificationCode(random.toString())
                .enabled(false)
                .build();

        try {
            userRepository.save(user);
            var userModel = UserModel.builder().user(user).build();
            sendVerificationEmail(user, siteURL);

            var jwtToken = jwtService.generateToken(userModel);
            var data = ResponseAuth.builder().token(jwtToken).user(user).build();
            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("Đăng ký thành công").data(data).build());
        }catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    public ResponseEntity<ResponseObject> login(AuthenticationRequest req){

        try {
            Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    req.getEmail(),
                    req.getPassword()
            ));

            UserModel userModel = (UserModel) authentication.getPrincipal();

            if(userModel == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        ResponseObject.builder().statusCode(404).message("Email chưa được đăng ký").data("").build()
                );
            }

            if(!passwordEncoder.matches(req.getPassword(),userModel.getPassword())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        ResponseObject.builder().statusCode(401).message("Mật khẩu không đúng").data("").build()
                );
            }



            var jwtToken = jwtService.generateToken(userModel);
            var data = ResponseAuth.builder().token(jwtToken).user(userModel.getUser()).build();
            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("Đăng nhập thành công").data(data).build());
        }
        catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    ResponseObject.builder()
                            .statusCode(401)
                            .message("Xác thực không thành công")
                            .data("")
                            .build()
            );
        }


    }

    public void sendVerificationEmail(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
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
