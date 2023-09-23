package com.spring.server.controllers;

import com.spring.server.data.BookData;
import com.spring.server.data.ResponseObject;
import com.spring.server.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    @PostMapping
    public ResponseEntity<ResponseObject> createBook(@RequestBody BookData bookData, Authentication authentication){
        return bookService.createBook(bookData,authentication);
    }
}
