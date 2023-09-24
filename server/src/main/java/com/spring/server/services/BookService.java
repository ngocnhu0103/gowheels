package com.spring.server.services;

import com.spring.server.data.BookData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Bike;
import com.spring.server.models.Booking;
import com.spring.server.repositories.BikeRepository;
import com.spring.server.repositories.BookRepository;
import com.spring.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor

public class BookService {
    private final BookRepository bookRepository;
    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;
    public ResponseEntity<ResponseObject> createBook(BookData bookData, Authentication authentication){
        var bike = bikeRepository.findById(bookData.getBikeId());
        var bookList = bookRepository.findAllByBike(bike.get());
        if(bookList.size() > 0) {
          boolean checkDate = false;
          for(Booking booking : bookList) {
              if(bookData.getStartDate().compareTo(booking.getEndDate()) > 0) {
                  checkDate = true;
                  continue;
              } else if(bookData.getEndDate().compareTo(booking.getStartDate()) < 0){
                  checkDate = true;
                  continue;
              } else {
                  checkDate = false;
              }
          }
          if(!checkDate) {
              return new ResponseEntity<>(ResponseObject.builder().statusCode(402).message("Ngày không hợp lệ").data("").build(), HttpStatus.CONFLICT);
          }
       }

        var renter = userRepository.findByEmail(authentication.getName());
        var newBook = Booking.builder().bike(bike.get()).renter(renter.get()).startDate(bookData.getStartDate()).endDate(bookData.getEndDate())
                .paymentMethod(bookData.getPaymentMethod()).totalPrice(bookData.getTotalPrice()).status("Đang chờ duyệt").build();
        return ResponseEntity.ok(ResponseObject.builder().statusCode(201).message("Đặt xe thành công").data(newBook).build());
    }

    public ResponseEntity<ResponseObject> getAllRenterBook(Authentication authentication){
        var renter = userRepository.findByEmail(authentication.getName());
        var renterBooks = bookRepository.findAllByRenter(renter.get());

        return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("success").data(renterBooks).build());
    }
    public ResponseEntity<ResponseObject> getAllOwnerBook(Authentication authentication){
        var owner = userRepository.findByEmail(authentication.getName());
        var bikes = bikeRepository.findAllByOwner(owner.get());
        List<Booking> bookings = new ArrayList<>();
        for (Bike bike: bikes
             ) {
            var bookList = bookRepository.findAllByBike(bike);
            if(!bookList.isEmpty()){
                bookings.addAll(bookList);
            }
        }

        return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("success").data(bookings).build());
    }
    public ResponseEntity<ResponseObject> updateStatus(String newStatus,Long bookId){
        var book = bookRepository.findById(bookId);
        if(!book.isEmpty()){
            book.get().setStatus(newStatus);
            bookRepository.save(book.get());
            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("success").data(book.get()).build());
        }
        return  ResponseEntity.status(404).body(ResponseObject.builder().statusCode(404).message("Not found").build());
    }
    // Thanh toan
    // Cap nhat phu thu
    //
}
