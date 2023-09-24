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
    @GetMapping("/renter")
    public  ResponseEntity<ResponseObject> getAllRenterBook(Authentication authentication){
        return  bookService.getAllRenterBook(authentication);
    }
    @GetMapping("/owner-bike")
    public  ResponseEntity<ResponseObject> getAllOwnerBook(Authentication authentication){
        return  bookService.getAllOwnerBook(authentication);
    }
    @PostMapping("/update-status/{bookId}")
    public  ResponseEntity<ResponseObject> updateStatus(@PathVariable Long bookId, @RequestBody String newStatus){
        return  bookService.updateStatus(newStatus,bookId);
    }
    @PostMapping("/payment/{bookId}")
    public  ResponseEntity<ResponseObject> updateStatus(@PathVariable Long bookId, @RequestBody String newStatus){
        return  bookService.updateStatus(newStatus,bookId);
    }
}
