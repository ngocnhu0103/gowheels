package com.spring.server.controllers;

import com.spring.server.data.AuthenticationRequest;
import com.spring.server.data.RegisterRequest;
import com.spring.server.data.ResponseObject;
import com.spring.server.services.AuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

//    @RequestBody : form
//    @RequestParam: /api/v1/user?name=fjasdfhs
//    @Pathvariable: /api/v1/user/sdlfaskldfhsadf
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<ResponseObject> register(@RequestBody RegisterRequest req ) throws UnsupportedEncodingException, MessagingException {
        return authenticationService.register(req);
    }
    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody AuthenticationRequest req) {
        return authenticationService.login(req);
    }
    @GetMapping("/verify")
    public ResponseEntity<ResponseObject> verifyUser(@RequestParam("code") String code, Authentication authentication) {
        return authenticationService.verify(code,authentication);
    }
    @GetMapping("/resend")
    public ResponseEntity<ResponseObject> reSendOtp(Authentication authentication) throws UnsupportedEncodingException, MessagingException{
        return authenticationService.reSendOtp(authentication);
    }
}
