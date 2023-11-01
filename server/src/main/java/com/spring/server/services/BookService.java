package com.spring.server.services;

import com.spring.server.data.BookData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Bike;
import com.spring.server.models.Booking;
import com.spring.server.repositories.BikeRepository;
import com.spring.server.repositories.BookRepository;
import com.spring.server.repositories.SurchargeRepository;
import com.spring.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor

public class BookService {
    private final BookRepository bookRepository;
    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;
    private final SurchargeRepository surchargeRepository;
    public ResponseEntity<ResponseObject> createBook(BookData bookData, Authentication authentication) throws ParseException{
        if(CompareToDate(bookData.getStartDate(),bookData.getEndDate()) == 0){
            return  ResponseEntity.status(400).body(
                    ResponseObject.builder().statusCode(400).message("Ngày nhận xe và trả xe không hợp lệ").data("").build()
            );
        }
        var bike = bikeRepository.findById(bookData.getBikeId());
        var bookList = bookRepository.findByBike(bike.get());
        if(bookList.size() > 0) {
          boolean checkDate = false;
          for(Booking booking : bookList) {
              if(CompareToDate(bookData.getStartDate(),booking.getEndDate()) > 0) {
                  checkDate = true;
                  continue;
              } else if(CompareToDate(bookData.getEndDate(),booking.getStartDate()) < 0){
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
                .paymentMethod(bookData.getPaymentMethod()).isDeposit(false).totalPrice(bookData.getTotalPrice()).status("Đang chờ duyệt").build();
        var createdBook =  bookRepository.save(newBook);
        return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("Đặt xe thành công").data(createdBook).build());
    }
    //@gel all book for renter
    public ResponseEntity<ResponseObject> getAllRenterBook(Authentication authentication){
        var renter = userRepository.findByEmail(authentication.getName());
        var renterBooks = bookRepository.findByRenter(renter.get());
        return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("success").data(renterBooks).build());
    }
    //@gel all book detail
    public ResponseEntity<ResponseObject> getBookById(Long id){
        var book = bookRepository.findById(id);

        if(book.isEmpty()){
            return ResponseEntity.status(404).body(ResponseObject.builder().statusCode(404).message("Book not found").build());
        }
        return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("success").data(book.get()).build());
    }
    //@gel all book for owner
    public ResponseEntity<ResponseObject> getAllOwnerBook(Authentication authentication){
        var owner = userRepository.findByEmail(authentication.getName());
        var bikes = bikeRepository.findAllByOwner(owner.get());
        List<Booking> bookings = new ArrayList<>();
        for (Bike bike: bikes
             ) {
            var bookList = bookRepository.findByBike(bike);
            if(!bookList.isEmpty()){
                bookings.addAll(bookList);
            }
        }

        return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("success").data(bookings).build());
    }
    //@update status book
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
    public ResponseEntity<ResponseObject> charge(Long bookId, Authentication authentication){
        return null;
    }
    //@ add the surchage for book

    public ResponseEntity<ResponseObject> deposited(Long bookId, Authentication authentication){
        var book = bookRepository.findById(bookId);
        if(!book.isEmpty()){
            book.get().setStatus("Đã thanh toán tiền cọc");
            book.get().setDeposit(true);
            bookRepository.save(book.get());
            return ResponseEntity.ok(ResponseObject.builder().statusCode(200).message("success").data(book.get()).build());
        }
        return  ResponseEntity.status(404).body(ResponseObject.builder().statusCode(404).message("Not found").build());
    }


    private int CompareToDate(Date date1, Date date2) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        String str1 = format.format(date1);
        String str2 = format.format(date2);
        return format.parse(str1).compareTo(format.parse(str2));


    }
}
