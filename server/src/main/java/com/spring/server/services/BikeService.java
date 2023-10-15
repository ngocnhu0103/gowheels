package com.spring.server.services;

import com.spring.server.data.BikeData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Bike;
import com.spring.server.models.Category;
import com.spring.server.models.Image;
import com.spring.server.models.Tag;
import com.spring.server.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BikeService {
    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final ImageRepository imageRepository;
    private final BikePaginationRepository bikePaginationRepository;
    private final BookRepository bookRepository;
    public ResponseEntity<ResponseObject> createBike(BikeData bikeData, Authentication authentication){
        System.out.println(authentication);
        try{
            var foundBike = bikeRepository.findByBikeCode(bikeData.getBikeCode());
            if(foundBike == null ) {
                var owner = userRepository.findByEmail(authentication.getName());
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
                bike.setWeekDiscount(bikeData.getWeekDiscount());
                bike.setMonthDiscount(bikeData.getMonthDiscount());
                bike.setCategory(category.get());
                bike.setTagList(tags);
                bike.setPlace(bikeData.getPlace());
                bike.setImages(images);
                Bike createdBike = bikeRepository.save(bike);

                System.out.println(createdBike);


                return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("Tạo xe thành công").data(createdBike).build());
            }
            return new ResponseEntity<>(ResponseObject.builder().statusCode(402).message("Biển số xe đã tồn tại").data("").build(), HttpStatus.CONFLICT);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    public ResponseEntity<ResponseObject> getAllBike(String bikeName, int page, int size){
        try{
            List<Bike> bikeList = new ArrayList<>();
            Page<Bike> pageBikes;
            Pageable pageable = PageRequest.of(page, size);
            if(bikeName == null){
                pageBikes = bikePaginationRepository.findAll(pageable);
            } else {
                pageBikes = bikePaginationRepository.findByBikeNameContaining(bikeName,pageable);
            }
            bikeList = pageBikes.getContent();
            System.out.println(bikeList);
            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("thành công").data(bikeList).build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }

    public ResponseEntity<ResponseObject> getAllBikeByTags(String bikeName, int page, int size,List<Tag> tags){
        try{
            List<Bike> bikeList = new ArrayList<>();
            Page<Bike> pageBikes;
            Pageable pageable = PageRequest.of(page, size);
            if(bikeName == null ){
                pageBikes = bikePaginationRepository.findAll(pageable);
            } else {
                pageBikes = bikePaginationRepository.findByBikeNameContainingAndTagListIn(bikeName,pageable,tags);
            }
            bikeList = pageBikes.getContent();
            System.out.println(bikeList);
            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("thành công").data(bikeList).build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.ok(ResponseObject.builder().statusCode(500).message(e.getMessage()).data("").build());
        }
    }
    public ResponseEntity<ResponseObject> getBikeById(Long Id){
        try{
            var bike = bikeRepository.findById(Id);

            if(bike.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(200).message("Thành công").data(bike.get()).build());
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
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(200).message("Xóa bike thành công").data("").build());
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
                var category = categoryRepository.findById(newBike.getCategoryId());
                List<Tag> tags = new ArrayList<>();
                for(Long t : newBike.getTagList()){
                    var tag = tagRepository.findById(t).get();
                    tags.add(tag);
                }
                List<Image> images = new ArrayList<>();
                for(String t : newBike.getImages()){
                    Image img = new Image();
                    img.setUrl(t);

                    images.add(img);

                }
                bike.get().setBikeName(newBike.getBikeName());
                bike.get().setBikeCode(newBike.getBikeCode());
                bike.get().setStatus(newBike.getStatus());
                bike.get().setPlace(newBike.getPlace());
                bike.get().setTagList(tags);
                bike.get().setCategory(category.get());
                bike.get().setDescription(newBike.getDescription());
                bike.get().setColor(newBike.getColor());
                bike.get().setImages(images);
                bikeRepository.save(bike.get());
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(200).message("Update bike thành công").data(bike.get()).build());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().message("Not found").build());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }

    public ResponseEntity<ResponseObject> searchingBike(String place, Date startDate, Date endDate, int page, int size){
        try {
            List<Bike> bikeList = new ArrayList<>();
            Page<Bike> pageBikes;
            Pageable pageable = PageRequest.of(page, size);
            var bikes = bikePaginationRepository.findByPlaceContaining(place,pageable);

            for (Bike bike: bikes.getContent()
                 ) {
                var books = bookRepository.findAllByBikeAndStartDateAndEndDate(bike,startDate,endDate);
                if(books.isEmpty()){
                    bikeList.add(bike);
                }
            }
            return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).data(bikeList).message("Successful").build());
        }catch (Exception e){
//            throw new RuntimeException(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }
}
