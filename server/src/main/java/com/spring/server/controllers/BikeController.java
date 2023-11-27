package com.spring.server.controllers;

import com.spring.server.data.BikeData;
import com.spring.server.data.ResponseObject;
import com.spring.server.data.StatusData;
import com.spring.server.models.Bike;
import com.spring.server.models.Tag;
import com.spring.server.services.BikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    
    public ResponseEntity<ResponseObject> getAllBike(
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "12" ) int size) {
        return bikeService.getAllBike(page,size);
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
    @GetMapping("/search")
    public ResponseEntity<ResponseObject> searchBike(@RequestParam(required = false) String place,
                                                     @RequestParam(required = false) String categoryName,
                                                     @RequestParam(required = false) List<Long> tagIds,
                                                     @RequestParam(required = false) Date startDate,
                                                     @RequestParam(required = false) Date endDate,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10" ) int size) {
        return bikeService.searchingBike(place,categoryName,tagIds,startDate,endDate,page,size);
    }


    @PostMapping("/like/{id}")
    public ResponseEntity<ResponseObject> likeBike(@PathVariable Long id, Authentication authentication) {
        return bikeService.likeBike(id,authentication);
    }
    @PostMapping("/dislike/{id}")
    public ResponseEntity<ResponseObject> dislikeBike(@PathVariable Long id, Authentication authentication) {
        return bikeService.dislikeBike(id, authentication);
    }
    @GetMapping("/mystranport")
    public ResponseEntity<ResponseObject> getMyStranport( Authentication authentication) {
        return bikeService.getMyStranport( authentication);
    }
    @GetMapping("/getbikes/{userId}")
    public ResponseEntity<ResponseObject> getBikes(@PathVariable Long userId) {
        return bikeService.getBikes(userId);
    }
    @PostMapping("/update-status/{id}")
    public ResponseEntity<ResponseObject> dislikeBike(@PathVariable Long id,@RequestBody StatusData statusData) {
        return bikeService.updateBikeStatus(id, statusData);
    }

    @GetMapping("/top-place")
    public ResponseEntity<ResponseObject> getTopPlace() {
        return bikeService.getTopPlace();
    }
    @GetMapping("/similar")
    public ResponseEntity<ResponseObject> findSimilar(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Long bikeId,
            @RequestParam(required = false) String color,
            @RequestParam(required = true) String categoryName,
            @RequestParam(required = false) List<Long> tagIds
    ){
        return bikeService.findSimilar(color, categoryName, tagIds, city,bikeId);
    }

}
