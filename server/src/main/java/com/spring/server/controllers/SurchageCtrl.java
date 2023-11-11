package com.spring.server.controllers;

import com.spring.server.data.ResponseObject;
import com.spring.server.services.SurchargeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/surchage")
@RequiredArgsConstructor
public class SurchageCtrl {
    private final SurchargeService surchargeService;
    @GetMapping
    public ResponseEntity<ResponseObject> getSurchages(){
        return surchargeService.getSurcharges();
    }
}
