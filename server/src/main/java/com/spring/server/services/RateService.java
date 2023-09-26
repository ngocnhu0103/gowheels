package com.spring.server.services;

import com.spring.server.data.RateData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Rate;
import com.spring.server.repositories.RateRepository;
import com.spring.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RateService {
    //@DJ
    private final RateRepository rateRepository;
    private final UserRepository userRepository;
    //@services
    //@getAllByOwner
    public ResponseEntity<ResponseObject> getAll(String userId){
        try {
            var user = userRepository.findById(userId);
            var rates = rateRepository.findAllByOwner(user.get());

            return ResponseEntity.ok().body(ResponseObject.builder().message("get all success").statusCode(200).data(rates).build());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }
    //@post
    public ResponseEntity<ResponseObject> rating(RateData rateData , Authentication authentication){
        try {
            var owner = userRepository.findById(rateData.getOwnerId());
            var author = userRepository.findByEmail(authentication.getName());
            var rate = Rate.builder().author(author.get())
                    .owner(owner.get()).content(rateData.getContent())
                    .timeRate(rateData.getCreatedAt())
                    .startNumber(rateData.getStartNumber()).build();
            rateRepository.save(rate);
            return ResponseEntity.ok().body(ResponseObject.builder().message("post success").statusCode(200).data(rate).build());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }
    //@delete
    public ResponseEntity<ResponseObject> deleteRate(Long id){
        try {
            rateRepository.deleteById(id);
            return ResponseEntity.ok().body(ResponseObject.builder().message("delete success").statusCode(200).build());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }
    //@getOne
    public ResponseEntity<ResponseObject> getRate(Long id){
        try {
            var rate = rateRepository.findById(id);
            return ResponseEntity.ok().body(ResponseObject.builder().message("get success").statusCode(200).data(rate).build());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }
}
