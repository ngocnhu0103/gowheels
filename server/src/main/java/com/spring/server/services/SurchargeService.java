package com.spring.server.services;

import com.spring.server.data.ResponseObject;
import com.spring.server.repositories.SurchargeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SurchargeService {
    private final SurchargeRepository surchargeRepository;

    public ResponseEntity<ResponseObject> getSurcharges(){
        try {
            var surcharges = surchargeRepository.findAll();
            return ResponseEntity.ok().body(ResponseObject.builder().message("get success").statusCode(200).data(surcharges).build());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }
}
