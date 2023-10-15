package com.spring.server.services;

import com.spring.server.data.AuthenticationRequest;
import com.spring.server.data.RegisterRequest;
import com.spring.server.data.ResponseAuth;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.*;
import com.spring.server.repositories.ImageRepository;
import com.spring.server.repositories.UserRepository;
import com.spring.server.repositories.VerifyOTPRepository;
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
import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final VerifyOTPRepository verifyOTPRepository;

    private final ImageRepository imageRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final JavaMailSender mailSender;

    public ResponseEntity<ResponseObject> register(RegisterRequest req) throws UnsupportedEncodingException, MessagingException {

        var userFound = userRepository.findByEmail(req.getEmail());

        if(userFound.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseObject.builder().statusCode(401).message("Email đã được đăng ký").data("").build());
        }

        if(!req.getPassword().equals(req.getRepeatPassword())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseObject.builder().statusCode(401).message("Mật khẩu không khớp").data("").build());
        }

        var avatar = Image.builder().url("https://firebasestorage.googleapis.com/v0/b/gowheels-b0d13.appspot.com/o/files%2FuserDefault.png_5120?alt=media&token=09d7c9ae-3b20-482a-9adf-45f0da7e807d&_gl=1*1jyyhh6*_ga*MTk4NTg3MTE0MS4xNjk0ODY1NjA1*_ga_CW55HF8NVT*MTY5NzAzMzQ5NS4zLjEuMTY5NzAzMzUzOC4xNy4wLjA.").build();


         Random r = new Random();
         Integer random = r.nextInt(900000) + 100000;
         var user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .fullName(req.getFullName())
                 .createdAt(new Date())
                .avatar(avatar)
                 .gender(req.getGender())
                .role(Role.USER)
                .enabled(false)
                .build();

        try {
            userRepository.save(user);
//          add verify date
            Calendar date = Calendar.getInstance();
            long timeInSecs = date.getTimeInMillis();

            var verifyOTP = VerifyOTP.builder().otp(random.toString())
                    .user(user)
                    .expiryDate(new Date(timeInSecs + (3 * 60 * 1000)))
                    .build();
            verifyOTPRepository.save(verifyOTP);

            var userModel = UserModel.builder().user(user).build();
            sendVerificationEmail(user);

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

    public void sendVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "ngocnhu010301@gmail.com";
        String senderName = "Gowheels";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "<!doctype html><html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\"><head><title></title><!--[if !mso]><!--><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><!--<![endif]--><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style type=\"text/css\">#outlook a { padding:0; }\n" +
                "          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }\n" +
                "          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }\n" +
                "          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }\n" +
                "          p { display:block;margin:13px 0; }</style><!--[if mso]>\n" +
                "        <noscript>\n" +
                "        <xml>\n" +
                "        <o:OfficeDocumentSettings>\n" +
                "          <o:AllowPNG/>\n" +
                "          <o:PixelsPerInch>96</o:PixelsPerInch>\n" +
                "        </o:OfficeDocumentSettings>\n" +
                "        </xml>\n" +
                "        </noscript>\n" +
                "        <![endif]--><!--[if lte mso 11]>\n" +
                "        <style type=\"text/css\">\n" +
                "          .mj-outlook-group-fix { width:100% !important; }\n" +
                "        </style>\n" +
                "        <![endif]--><!--[if !mso]><!--><link href=\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700\" rel=\"stylesheet\" type=\"text/css\"><style type=\"text/css\">@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);</style><!--<![endif]--><style type=\"text/css\">@media only screen and (min-width:480px) {\n" +
                "        .mj-column-per-100 { width:100% !important; max-width: 100%; }\n" +
                "      }</style><style media=\"screen and (min-width:480px)\">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type=\"text/css\">@media only screen and (max-width:480px) {\n" +
                "      table.mj-full-width-mobile { width: 100% !important; }\n" +
                "      td.mj-full-width-mobile { width: auto !important; }\n" +
                "    }</style></head><body style=\"word-spacing:normal;background-color:#fafbfc;\"><div style=\"background-color:#fafbfc;\"><!--[if mso | IE]><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"\" style=\"width:600px;\" width=\"600\" ><tr><td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\"><![endif]--><div style=\"margin:0px auto;max-width:600px;\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"width:100%;\"><tbody><tr><td style=\"direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;\"><!--[if mso | IE]><table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td class=\"\" style=\"vertical-align:middle;width:600px;\" ><![endif]--><div class=\"mj-column-per-100 mj-outlook-group-fix\" style=\"font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"vertical-align:middle;\" width=\"100%\"><tbody><tr><td align=\"center\" style=\"font-size:0px;padding:25px;word-break:break-word;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"border-collapse:collapse;border-spacing:0px;\"><tbody><tr><td style=\"width:125px;\"><img height=\"auto\" src=\"https://firebasestorage.googleapis.com/v0/b/gowheels-b0d13.appspot.com/o/files%2Fbg.png?alt=media&token=08525bda-3861-4902-af5b-7307af1cc5fe&_gl=1*u0roia*_ga*MTk4NTg3MTE0MS4xNjk0ODY1NjA1*_ga_CW55HF8NVT*MTY5NzM3NTgxNS40LjEuMTY5NzM3NTkxMy4yMi4wLjA.\" style=\"border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;\" width=\"125\"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"\" style=\"width:600px;\" width=\"600\" bgcolor=\"#ffffff\" ><tr><td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\"><![endif]--><div style=\"background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"background:#ffffff;background-color:#ffffff;width:100%;\"><tbody><tr><td style=\"direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;\"><!--[if mso | IE]><table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td class=\"\" style=\"vertical-align:middle;width:600px;\" ><![endif]--><div class=\"mj-column-per-100 mj-outlook-group-fix\" style=\"font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"vertical-align:middle;\" width=\"100%\"><tbody><tr><td align=\"center\" style=\"font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;\"><div style=\"font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;\"><span>Hello,</span></div></td></tr><tr><td align=\"center\" style=\"font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;\"><div style=\"font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;\">Please use the verification code below on the Gowheels website:</div></td></tr><tr><td align=\"center\" style=\"font-size:0px;padding:10px 25px;word-break:break-word;\"><div style=\"font-family:open Sans Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;line-height:1;text-align:center;color:#000000;\">{{VERIFICATION_CODE}}</div></td></tr><tr><td align=\"center\" style=\"font-size:0px;padding:10px 25px;padding-right:16px;padding-left:25px;word-break:break-word;\"><div style=\"font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;\">If you didn't request this, you can ignore this email or let us know.</div></td></tr><tr><td align=\"center\" style=\"font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;\"><div style=\"font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;\">Thanks!<br>Gowheels team</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        var otp = verifyOTPRepository.findByUser(user);
        content = content.replace("[[name]]", user.getEmail());

        content = content.replace("{{VERIFICATION_CODE}}", otp.getOtp());
        helper.setText(content, true);

        mailSender.send(message);
    }

    public ResponseEntity<ResponseObject> verify(String verifyOtp,Authentication authentication) {
        var userEmail = authentication.getName();
        var otp = verifyOTPRepository.findByOtp(verifyOtp);

        if(otp == null) {
            throw new RuntimeException("invalidToken");
        }
        Calendar cal = Calendar.getInstance();
        if((otp.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0 ){
            throw new RuntimeException("expired");
        }
        var user = userRepository.findByEmail(userEmail);
        user.get().setEnabled(true);
        userRepository.save(user.get());

        return ResponseEntity.status(200).body(ResponseObject
                .builder()
                .message("Verify email successfully")
                .build());
    }
}
