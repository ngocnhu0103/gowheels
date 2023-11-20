package com.spring.server.controllers;

import com.spring.server.data.ResponseObject;
import com.spring.server.services.StatisticalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/statistical")
@RequiredArgsConstructor
public class StatisticalCtrl {
    private final StatisticalService service;

    @GetMapping
    public ResponseEntity<ResponseObject> getBikesForStatistical(){
        return service.getBikesForStatistical();
    }
}
