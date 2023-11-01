package com.spring.server.controllers;

import com.spring.server.data.BookData;
import com.spring.server.data.ResponseObject;
import com.spring.server.data.StatusData;
import com.spring.server.services.BookService;
import com.spring.server.services.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;

@RestController
@RequestMapping("/api/v1/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    private final PaymentService paymentService;


    @PostMapping
    public ResponseEntity<ResponseObject> createBook(@RequestBody BookData bookData, Authentication authentication) throws ParseException {
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
    @GetMapping("/{bookId}")
    public  ResponseEntity<ResponseObject> getBookById(@PathVariable Long bookId){
        return  bookService.getBookById(bookId);
    }
    @PostMapping(value = "/update-status/{bookId}")
    public  ResponseEntity<ResponseObject> updateStatus(@PathVariable Long bookId, @RequestBody StatusData newStatus){
        return  bookService.updateStatus(newStatus.getNewStatus(),bookId);
    }
    @PostMapping("/payment/{bookId}")
    public  ResponseEntity<ResponseObject> charge(@PathVariable Long bookId, Authentication authentication) throws StripeException {
        return  paymentService.checkOut(bookId,authentication);
    }
    @PostMapping("/payment-deposit/{bookId}")
    public  ResponseEntity<ResponseObject> paymentDeposit(@PathVariable Long bookId, Authentication authentication) throws StripeException {
        return  paymentService.paymentDeposit(bookId,authentication);

    }
//    @PostMapping("/payment-deposit/success/{bookId}")
//    public  ResponseEntity<ResponseObject> deposited(@PathVariable Long bookId, Authentication authentication) throws StripeException {
//        return  bookService.deposited(bookId,authentication);
//    }
    @GetMapping("/payment/check/{bookId}")
    public  ResponseEntity<ResponseObject> deposited(@PathVariable Long bookId,@RequestParam String sessionId) throws StripeException {
        return  paymentService.findBySessionId(sessionId,bookId);
    }
}
