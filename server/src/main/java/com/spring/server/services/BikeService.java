package com.spring.server.services;

import com.spring.server.data.BikeData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Bike;
import com.spring.server.models.Category;
import com.spring.server.models.Tag;
import com.spring.server.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BikeService {
    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final PlaceRepository placeRepository;
    public ResponseEntity<ResponseObject> createBike(BikeData bikeData, Authentication authentication){
        System.out.println(authentication.getName());
        try{
            var foundBike = bikeRepository.findByBikeCode(bikeData.getBikeCode());
            if(foundBike == null ) {
                var owner = userRepository.findByEmail(authentication.getName());
                var place = placeRepository.findById(bikeData.getPlaceId());
                var category = categoryRepository.findById(bikeData.getCategoryId());

//                List<Tag> tags = new ArrayList<>();


                Bike bike = new Bike();
                bike.setBikeId(1L);
                bike.setBikeName(bikeData.getBikeName());
                bike.setBikeCode(bikeData.getBikeCode());
                bike.setColor(bikeData.getColor());
                bike.setPrice(bikeData.getPrice());
                bike.setDescription(bikeData.getDescription());
                bike.setStatus(bikeData.getStatus());
                bike.setOwner(owner.get());
                bike.setCategoryId(category.get());
//                bike.setTagList(tags);
                bike.setPlaceId(place.get());
//                bikeRepository.save(bike);
                for(Long t : bikeData.getTagList()){
                    var tag = tagRepository.findById(t);
//                    tags.add(tag.get());
                    tag.get().getBikes().add(bike);
                    tagRepository.save(tag.get());
                }
                return ResponseEntity.ok(ResponseObject.builder().statusCode(201).message("Tạo xe thành công").data(bike).build());
            }
            return new ResponseEntity<>(ResponseObject.builder().statusCode(402).message("Biển số xe đã tồn tại").data("").build(), HttpStatus.CONFLICT);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
