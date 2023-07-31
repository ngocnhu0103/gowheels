package com.spring.server.services;

import com.spring.server.data.BikeData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Bike;
import com.spring.server.models.Category;
import com.spring.server.models.Image;
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
    private final ImageRepository imageRepository;
    public ResponseEntity<ResponseObject> createBike(BikeData bikeData, Authentication authentication){
        System.out.println(authentication.getName());
        try{
            var foundBike = bikeRepository.findByBikeCode(bikeData.getBikeCode());
            if(foundBike == null ) {
                var owner = userRepository.findByEmail(authentication.getName());
                var place = placeRepository.findById(bikeData.getPlaceId());
                var category = categoryRepository.findById(bikeData.getCategoryId());

                List<Tag> tags = new ArrayList<>();
                for(Long t : bikeData.getTagList()){
                    var tag = tagRepository.findById(t).get();
                    tags.add(tag);
                }

                List<Image> images = new ArrayList<>();
                for(String t : bikeData.getImages()){
                    Image img = new Image();
                    img.setUrl(t);

                    images.add(img);

                }

                Bike bike = new Bike();
                bike.setBikeName(bikeData.getBikeName());
                bike.setBikeCode(bikeData.getBikeCode());
                bike.setColor(bikeData.getColor());
                bike.setPrice(bikeData.getPrice());
                bike.setDescription(bikeData.getDescription());
                bike.setStatus(bikeData.getStatus());
                bike.setOwner(owner.get());
                bike.setCategoryId(category.get());
                bike.setTagList(tags);
                bike.setPlaceId(place.get());
                bike.setImages(images);
                Bike createdBike = bikeRepository.save(bike);

                System.out.println(createdBike);


                return ResponseEntity.ok(ResponseObject.builder().statusCode(201).message("Tạo xe thành công").data(createdBike).build());
            }
            return new ResponseEntity<>(ResponseObject.builder().statusCode(402).message("Biển số xe đã tồn tại").data("").build(), HttpStatus.CONFLICT);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    public ResponseEntity<ResponseObject> getAllBike(){
        try{
            var bikeList = bikeRepository.findAll();
            System.out.println(bikeList);
            return ResponseEntity.ok(ResponseObject.builder().statusCode(201).message("thành công").data(bikeList).build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    public ResponseEntity<ResponseObject> getBikeById(Long Id){
        try{
            var bike = bikeRepository.findById(Id);

            if(bike.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(201).message("Thành công").data(bike.get()).build());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().message("Not found").build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }
    public ResponseEntity<ResponseObject> deleteBikeById(Long Id) {
        try {
            var bike = bikeRepository.findById(Id);

            if (bike.isPresent()) {
                bikeRepository.deleteById(Id);
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(201).message("Xóa bike thành công").data("").build());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().message("Not found").build());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }
    public ResponseEntity<ResponseObject> editBikeById(Long Id, BikeData newBike) {
        try {
            var bike = bikeRepository.findById(Id);

            if (bike.isPresent()) {
                var place = placeRepository.findById(newBike.getPlaceId());
                var category = categoryRepository.findById(newBike.getCategoryId());
                List<Tag> tags = new ArrayList<>();
                for(Long t : newBike.getTagList()){
                    var tag = tagRepository.findById(t).get();
                    tags.add(tag);
                }
                bike.get().setBikeName(newBike.getBikeName());
                bike.get().setBikeCode(newBike.getBikeCode());
                bike.get().setStatus(newBike.getStatus());
                bike.get().setPlaceId(place.get());
                bike.get().setTagList(tags);
                bike.get().setCategoryId(category.get());
                bike.get().setDescription(newBike.getDescription());
                bike.get().setColor(newBike.getColor());

                bikeRepository.save(bike.get());
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(201).message("Update bike thành công").data(bike.get()).build());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().message("Not found").build());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }
}
