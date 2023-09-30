package com.spring.server.controllers;

import com.spring.server.data.BikeData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Bike;
import com.spring.server.models.Tag;
import com.spring.server.services.BikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/v1/bike")
@RequiredArgsConstructor
public class BikeController {
    private final BikeService bikeService;
    @PostMapping
    public ResponseEntity<ResponseObject> createBike(@RequestBody BikeData bikeData, Authentication authentication){
        return bikeService.createBike(bikeData,authentication);
    }
    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAllBike(@RequestParam(required = false) String bikeName,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "12" ) int size) {
        return bikeService.getAllBike(bikeName,page,size);
    }
    @GetMapping("/all/tag")
    public ResponseEntity<ResponseObject> getAllBikeByTags(@RequestParam(required = false) String bikeName,
                                                           @RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "12" ) int size,
                                                           @RequestParam(required = false) List<Tag> tags) {
        return bikeService.getAllBikeByTags(bikeName,page,size,tags);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getBikeById(@PathVariable Long id) {
        return bikeService.getBikeById(id);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteBikeById(@PathVariable Long id) {
        return bikeService.deleteBikeById(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> editBikeById(@PathVariable Long id, @RequestBody BikeData newBike) {
        return bikeService.editBikeById(id, newBike);
    }

}
