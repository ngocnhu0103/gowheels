package com.spring.server.services;

import com.spring.server.data.*;
import com.spring.server.models.Bike;
import com.spring.server.models.Category;
import com.spring.server.models.Image;
import com.spring.server.models.Tag;
import com.spring.server.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor

public class BikeService {
    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final ImageRepository imageRepository;
    private final BikePaginationRepository bikePaginationRepository;
    private final BookRepository bookRepository;

    @Transactional
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
                    var img = Image.builder().url(t).build();
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
                bike.setStatus("show");
                bike.setWeekDiscount(bikeData.getWeekDiscount());
                bike.setMonthDiscount(bikeData.getMonthDiscount());
                bike.setCategory(category.get());
                bike.setTagList(tags);
                bike.setPlace(bikeData.getPlace());
                bike.setCity(bikeData.getCity());
                bike.setLat(bikeData.getLat());
                bike.setLng(bikeData.getLng());
                bike.setImages(images);
                Bike createdBike = bikeRepository.save(bike);

                System.out.println(createdBike);


                return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("Tạo xe thành công").data(createdBike).build());
            }
            return  ResponseEntity.status(400).body(ResponseObject.builder().statusCode(400).message("Biển số xe đã tồn tại").data("").build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    public ResponseEntity<ResponseObject> getAllBike(int page, int size){
        try{
            List<Bike> bikeList = new ArrayList<>();
            Page<Bike> pageBikes;
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdOn").descending());
            pageBikes = bikePaginationRepository.findAllByStatus(pageable,"show");
            bikeList = pageBikes.getContent();
            System.out.println(bikeList);
            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("thành công").data(bikeList).build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }

//    public ResponseEntity<ResponseObject> getAllBikeByTags(String bikeName, int page, int size,List<Tag> tags){
//        try{
//            List<Bike> bikeList = new ArrayList<>();
//            Page<Bike> pageBikes;
//            Pageable pageable = PageRequest.of(page, size);
//            if(bikeName == null ){
//                pageBikes = bikePaginationRepository.findAll(pageable);
//            } else {
//                pageBikes = bikePaginationRepository.findByBikeNameContainingAndTagListIn(bikeName,pageable,tags);
//            }
//            bikeList = pageBikes.getContent();
//            System.out.println(bikeList);
//            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("thành công").data(bikeList).build());
//        }catch (Exception e){
//            System.out.println(e.getMessage());
//            return ResponseEntity.ok(ResponseObject.builder().statusCode(500).message(e.getMessage()).data("").build());
//        }
//    }
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
                bike.get().setLat(newBike.getLat());
                bike.get().setLng(newBike.getLng());
                bike.get().setCity(newBike.getCity());
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

    public ResponseEntity<ResponseObject> searchingBike(String place,String categoryName,List<Long> tagIds , Date startDate, Date endDate, int page, int size){
        List<Tag> tags = new ArrayList<>();
        List<Bike> bikel = new ArrayList<>();
        Page<Bike> bikes;
        System.out.println("tagIds = " + tagIds);
        if(tagIds != null) {
            for (Long id: tagIds
            ) {
                var tag = tagRepository.findById(id);
                tags.add(tag.get());
            }
        }
        if (place == null){
            place = "";
        }
        System.out.println("place = " + place);
        System.out.println("categoryName = " + categoryName);
        System.out.println("tagIds = " + tagIds);
        try {
            var searchData = SearchData.builder().build();
            Pageable pageable = PageRequest.of(page, size);

            Long totalBike;

            if(categoryName == null && tagIds == null ){
                bikes = bikePaginationRepository.findByPlaceContainingAndStatus(place,pageable,"show");
                totalBike = bikePaginationRepository.findByPlaceContainingAndStatus(place,PageRequest.of(page, 100),"show").getTotalElements();
            } else if (categoryName == null) {
                bikes = bikePaginationRepository.findByPlaceContainingAndStatusAndTagListIn(pageable,place,"show",tags);
                totalBike = bikePaginationRepository.findByPlaceContainingAndStatusAndTagListIn(PageRequest.of(page, 100),place,"show",tags).getTotalElements();
            } else if (tagIds == null) {
                bikes = bikePaginationRepository.findByPlaceContainingAndCategoryCategoryNameContainingAndStatus(pageable,place,categoryName,"show");
                totalBike  = bikePaginationRepository.findByPlaceContainingAndCategoryCategoryNameContainingAndStatus(PageRequest.of(page, 100),place,categoryName,"show").getTotalElements();
            }else {
                bikes =
            bikePaginationRepository.findByPlaceContainingAndCategoryCategoryNameContainingAndStatusAndTagListIn(pageable,place,categoryName,"show",tags);
                totalBike = bikePaginationRepository.findByPlaceContainingAndCategoryCategoryNameContainingAndStatusAndTagListIn(PageRequest.of(page, 100),place,categoryName,"show",tags).getTotalElements();
            }

            searchData.setTotals(totalBike);
            for (Bike bike: bikes.getContent()
                 ) {
                var books = bookRepository.findAllByBikeAndStartDateAndEndDate(bike,startDate,endDate);
                if(books.isEmpty()){
                    bikel.add(bike);
                }
            }
            searchData.setBikeList(bikel);
            return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).data(searchData).message("Successful").build());
        }catch (Exception e){
//            throw new RuntimeException(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }

    public ResponseEntity<ResponseObject> likeBike(Long bikeId, Authentication authentication) {
        var user = userRepository.findByEmail(authentication.getName());
        var bike = bikeRepository.findById(bikeId);
        user.get().getLikes().add(bike.get());

        userRepository.save(user.get());

        return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).data(user.get()).message("Đã thêm yêu thích").build());
    }
    public ResponseEntity<ResponseObject> dislikeBike(Long bikeId, Authentication authentication) {
        var user = userRepository.findByEmail(authentication.getName());
        var bike = bikeRepository.findById(bikeId);
        user.get().getLikes().remove(bike.get());

        userRepository.save(user.get());
        return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).data(user.get()).message("Successful").build());
    }
    public ResponseEntity<ResponseObject> getMyStranport( Authentication authentication) {
        var user = userRepository.findByEmail(authentication.getName());
        var bikes = bikeRepository.findAllByOwner(user.get());

        return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).data(bikes).message("Successful").build());
    }
    public ResponseEntity<ResponseObject> updateBikeStatus(Long bikeId, StatusData statusData) {
        var bike = bikeRepository.findById(bikeId);

        bike.get().setStatus(statusData.getNewStatus());

        bikeRepository.save(bike.get());
        return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).data(bike.get()).message("Successful").build());
    }

    public ResponseEntity<ResponseObject> getBikes(Long userId) {
        var user = userRepository.findById(userId);
        var bikes = bikeRepository.findAllByOwner(user.get());

        return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).data(bikes).message("Successful").build());
    }

    public ResponseEntity<ResponseObject> getTopPlace() {
        try {
            Pageable pageable = PageRequest.of(0, 5);
            var pages = bikePaginationRepository.findTop5CommonCities(pageable);

            return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).data(pages.getContent()).message("Successful").build());
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(ResponseObject.builder().statusCode(500).message("Failed" + e.getMessage()).build());
        }
    }

    public ResponseEntity<ResponseObject> findSimilar(String color,String categoryName, List<Long> tagIds, String city,Long bikeId) {
        List<Tag> tags = new ArrayList<>();
        if(color == null) color = "";
        if(categoryName == null) categoryName = "";
        if(city == null) city = "";
        if(tagIds != null) {
            for (Long id: tagIds
            ) {
                var tag = tagRepository.findById(id);
                tags.add(tag.get());
            }
        }
        try {
            List<Bike> bikes1 = bikeRepository.findByCategoryCategoryNameAndStatusAndTagListInAndColorAndCityAndBikeIdIsNot(categoryName,"show",tags,color,city,bikeId);
            List<Bike> bikes2 = bikeRepository.findByCategoryCategoryNameAndStatusAndColorAndCityAndBikeIdIsNot(categoryName,"show",color,city,bikeId);
            List<Bike> bikes3 = bikeRepository.findByCategoryCategoryNameAndStatusAndCityAndBikeIdIsNot(categoryName,"show",city,bikeId);

            var similarBike = SlimilarData.builder().similar1(bikes1).similar2(bikes2).similar3(bikes3).build();

            return ResponseEntity.status(200).body(ResponseObject.builder().message("success").data(similarBike).statusCode(200).build());
        }
        catch (Exception e){
            return ResponseEntity.status(400).body(ResponseObject.builder().message("failed" + e.getMessage()).statusCode(400).build());
        }
    }
}
