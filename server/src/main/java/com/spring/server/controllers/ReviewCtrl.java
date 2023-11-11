package com.spring.server.controllers;

import com.spring.server.data.RateData;
import com.spring.server.data.ResponseObject;
import com.spring.server.services.RateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewCtrl {
    private final RateService rateService;

    @GetMapping("/{userId}")
    public ResponseEntity<ResponseObject> getAll(@PathVariable Long userId) {
        return rateService.getAll(userId);
    }
    @PostMapping
    public ResponseEntity<ResponseObject> rating(@RequestBody RateData rateData, Authentication authentication) {
        return rateService.rating(rateData,authentication);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteRate(@PathVariable Long id) {
        return rateService.deleteRate(id);
    }
}
