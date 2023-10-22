package com.spring.server.controllers;

import com.spring.server.data.ResponseObject;
import com.spring.server.data.UploadInfo;
import com.spring.server.data.UrlData;
import com.spring.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/update/avatar")
    public ResponseEntity<ResponseObject> uploadAvatar(@RequestBody UrlData data, Authentication authentication){
        return  userService.uploadAvatar(authentication,data);
    }
    @PutMapping("/update/info")
    public ResponseEntity<ResponseObject> uploadInfo(@RequestBody UploadInfo data, Authentication authentication){
        return  userService.uploadInfo(authentication,data);
    }
    @PostMapping("/register/owner")
    public ResponseEntity<ResponseObject> registerOwner(@RequestBody UploadInfo data, Authentication authentication){
        return  userService.registerOwner(authentication,data);
    }
}
