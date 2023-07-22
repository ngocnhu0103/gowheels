package com.spring.server.services;

import com.spring.server.data.ResponseObject;
import com.spring.server.models.Category;
import com.spring.server.models.Tag;
import com.spring.server.data.TagData;
import com.spring.server.repositories.CategoryRepository;
import com.spring.server.repositories.TagRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {

    @Autowired
    private  TagRepository tagRepository;


    public ResponseEntity<ResponseObject> createTag(TagData tagData){
        try{
            var foundTag = tagRepository.findByTagName(tagData.getNewTag());
            if(foundTag == null ) {
                Tag tag = new Tag();
                tag.setTagName(tagData.getNewTag());
                System.out.println(tag);
                tagRepository.save(tag);
                return ResponseEntity.ok(ResponseObject.builder().statusCode(201).message("Tạo tag thành công").data(tag).build());
            }
            return new ResponseEntity<>(ResponseObject.builder().statusCode(402).message("Tag đã tồn tại").data("").build(), HttpStatus.CONFLICT);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    public ResponseEntity<ResponseObject> getAllTag(){
        try{
            var tagList = tagRepository.findAll();

            return ResponseEntity.ok(ResponseObject.builder().statusCode(201).message("thành công").data(tagList).build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    public ResponseEntity<ResponseObject> getTagById(Long Id){
        try{
            var tag = tagRepository.findById(Id);

            if(tag.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(201).message("Thành công").data(tag.get()).build());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().message("Not found").build());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }

    public ResponseEntity<ResponseObject> deleteTagById(Long Id) {
        try {
            var tag = tagRepository.findById(Id);

            if (tag.isPresent()) {
                tagRepository.deleteById(Id);
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(201).message("Xóa tag thành công").data("").build());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().message("Not found").build());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }

    public ResponseEntity<ResponseObject> editTagById(Long Id, Tag newTag) {
        try {
            var tag = tagRepository.findById(Id);

            if (tag.isPresent()) {
                tag.get().setTagName(newTag.getTagName());
                tagRepository.save(tag.get());
                return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().statusCode(201).message("Update tag thành công").data(tag.get()).build());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().message("Not found").build());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseObject.builder().message("Internal server error").build());
        }
    }
}
