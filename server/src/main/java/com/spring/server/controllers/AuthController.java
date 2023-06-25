package com.spring.server.controllers;

import com.spring.server.models.AuthenticationRequest;
import com.spring.server.models.RegisterRequest;
import com.spring.server.models.ResponseObject;
import com.spring.server.models.UserModel;
import com.spring.server.services.AuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ResponseObject> register(@RequestBody RegisterRequest req, HttpServletRequest httpServletRequest) throws UnsupportedEncodingException, MessagingException {
        return authenticationService.register(req,getSiteURL(httpServletRequest));
    }
    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody AuthenticationRequest req) {
        return ResponseEntity.ok(authenticationService.login(req));
    }
    @GetMapping("/verify")
    public ResponseEntity<ResponseObject> verifyUser(@RequestParam("code") String code) {
        return ResponseEntity.ok(authenticationService.verify(code));
    }
    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
