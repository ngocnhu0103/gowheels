package com.spring.server.controllers;

import com.spring.server.data.ResponseObject;
import com.spring.server.data.TagData;
import com.spring.server.models.Tag;
import com.spring.server.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tag")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @PostMapping
    public ResponseEntity<ResponseObject> createTag(@RequestBody TagData tagData){
        return tagService.createTag(tagData);
    }
    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAllTag() {
        return tagService.getAllTag();
    }
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getTagById(@PathVariable Long id) {
        return tagService.getTagById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteTagById(@PathVariable Long id) {
        return tagService.deleteTagById(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> editTagById(@PathVariable Long id, @RequestBody Tag newTag) {
        return tagService.editTagById(id, newTag);
    }
}
