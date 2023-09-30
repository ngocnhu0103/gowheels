package com.spring.server.services;

import com.spring.server.data.ResponseObject;
import com.spring.server.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public ResponseEntity<ResponseObject> getAllCategory(){
        try{
            var categories = categoryRepository.findAll();

            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("thành công").data(categories).build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
