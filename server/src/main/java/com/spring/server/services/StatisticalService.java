package com.spring.server.services;

import com.spring.server.data.ResponseObject;
import com.spring.server.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticalService {
    private final UserRepository userRepository;
    private final BikeRepository bikeRepository;
    private final BikePaginationRepository bikePaginationRepository;
    private final BookRepository bookRepository;
    private final ReportRepository reportRepository;

    public ResponseEntity<ResponseObject> getBikesForStatistical(){

        try {
            var bikes = bikePaginationRepository.findAll(Sort.by("monthDiscount").descending());

            return  ResponseEntity.status(200).body(ResponseObject.builder().message("Get for statistical").data(bikes).statusCode(200).build());
        }
        catch (Exception e){
            System.out.println("error = " + e.getMessage());
            return ResponseEntity.status(500).body(ResponseObject.builder().statusCode(500).message("Server Internal Error").build());
        }
    }
}
