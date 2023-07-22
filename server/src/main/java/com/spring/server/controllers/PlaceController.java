package com.spring.server.controllers;

import com.spring.server.data.ResponseObject;
import com.spring.server.services.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/place")
@RequiredArgsConstructor

public class PlaceController {
    private final PlaceService placeService;
    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAllPlace() {
        return placeService.getAllPlace();
    }
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getPlaceById(@PathVariable String id) {
        return placeService.getPlaceById(id);
    }
}
