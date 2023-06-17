package com.spring.server.services;

import ch.qos.logback.core.testUtil.RandomUtil;
import com.spring.server.models.*;
import com.spring.server.repositories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.Random;
import java.util.UUID;
import java.util.random.RandomGenerator;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final JavaMailSender mailSender;

    public ResponseObject register(RegisterRequest req, String siteURL) throws UnsupportedEncodingException, MessagingException {
        UUID uuid = UUID.randomUUID();
        System.out.println(uuid.toString());
        var user = UserModel.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .phone(req.getPhone())
                .address(req.getAddress())
                .role(Role.USER)
                .verificationCode(uuid.toString())
                .enabled(false)
                .build();
        userRepository.save(user);

        sendVerificationEmail(user, siteURL);

        var jwtToken = jwtService.generateToken(user);
        return ResponseObject
                .builder()
                .token(jwtToken)
                .build();
    }
    public ResponseObject authenticate(AuthenticationRequest req){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                req.getEmail(),
                req.getPassword()
        ));
        var user = userRepository.findByEmail(req.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return ResponseObject
                .builder()
                .token(jwtToken)
                .build();
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
