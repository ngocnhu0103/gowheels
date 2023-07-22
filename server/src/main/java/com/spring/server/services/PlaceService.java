package com.spring.server.services;

import com.spring.server.data.ResponseObject;
import com.spring.server.repositories.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final PlaceRepository placeRepository;
    public ResponseEntity<ResponseObject> getAllPlace(){
        try{
            var placeList = placeRepository.findAll();

            return ResponseEntity.ok(ResponseObject.builder().statusCode(201).message("Lấy tất cả địa chỉ thành công").data(placeList).build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    public ResponseEntity<ResponseObject> getPlaceById(String Id){
        try{
            var place = placeRepository.findById(Id);

            if(place.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(201).message("Lấy địa chỉ thành công").data(place.get()).build());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().message("Not found").build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }
}
