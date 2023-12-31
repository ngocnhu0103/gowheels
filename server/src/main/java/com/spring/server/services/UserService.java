package com.spring.server.services;

import com.spring.server.data.ResponseObject;
import com.spring.server.data.UploadInfo;
import com.spring.server.data.UrlData;
import com.spring.server.models.Image;
import com.spring.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public ResponseEntity<ResponseObject> uploadAvatar(  Authentication authentication, UrlData data){
        System.out.println(data);
        try {
            var curUser = userRepository.findByEmail(authentication.getName());
            if(curUser.isEmpty()){
                return ResponseEntity.status(404).body(
                        ResponseObject.builder()
                                .statusCode(404)
                                .message("User not found")
                                .data("")
                                .build()
                );
            }

            var avatar = Image.builder().url(data.getUrl()).build();

            curUser.get().setAvatar(avatar);
            userRepository.save(curUser.get());
            System.out.println(curUser);
            return ResponseEntity.status(200).body(
                    ResponseObject.builder()
                            .statusCode(200)
                            .message("upload successful")
                            .data(curUser)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(400).body(
                    ResponseObject.builder()
                            .statusCode(400)
                            .message(e.getMessage())
                            .data("")
                            .build()
            );
        }
    }
    public ResponseEntity<ResponseObject> uploadInfo(Authentication authentication, UploadInfo data){
        System.out.println(data);
        try {
            var curUser = userRepository.findByEmail(authentication.getName());
            if(curUser.isEmpty()){
                return ResponseEntity.status(404).body(
                        ResponseObject.builder()
                                .statusCode(404)
                                .message("User not found")
                                .data("")
                                .build()
                );
            }

            curUser.get().setAddress(data.getAddress());
            curUser.get().setCmnd(data.getCmnd());
            curUser.get().setPhone(data.getPhone());
            userRepository.save(curUser.get());
            System.out.println(curUser);
            return ResponseEntity.status(200).body(
                    ResponseObject.builder()
                            .statusCode(200)
                            .message("Cập nhật thành công")
                            .data(curUser)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(400).body(
                    ResponseObject.builder()
                            .statusCode(400)
                            .message(e.getMessage())
                            .data("")
                            .build()
            );
        }
    }
    public ResponseEntity<ResponseObject> registerOwner(Authentication authentication, UploadInfo data){
        System.out.println(data);
        try {
            var curUser = userRepository.findByEmail(authentication.getName());
            if(curUser.isEmpty()){
                return ResponseEntity.status(404).body(
                        ResponseObject.builder()
                                .statusCode(404)
                                .message("User not found")
                                .data("")
                                .build()
                );
            }
            if(data.getCmnd().isEmpty() || data.getAddress().isEmpty() || data.getPhone().isEmpty()) {
                return ResponseEntity.status(401).body(
                        ResponseObject.builder()
                                .statusCode(401)
                                .message("Vui lòng điền hết thông tin")
                                .data("")
                                .build()
                );
            }
            curUser.get().setAddress(data.getAddress());
            curUser.get().setCmnd(data.getCmnd());
            curUser.get().setPhone(data.getPhone());
            curUser.get().setJobber(true);
            curUser.get().setPoint(100);
            userRepository.save(curUser.get());
            System.out.println(curUser);
            return ResponseEntity.status(200).body(
                    ResponseObject.builder()
                            .statusCode(200)
                            .message("Bạn đã trở thành chủ xe")
                            .data(curUser)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(400).body(
                    ResponseObject.builder()
                            .statusCode(400)
                            .message(e.getMessage())
                            .data("")
                            .build()
            );
        }
    }

    public ResponseEntity<ResponseObject> getUser(Long userId) {
        try {
            var user = userRepository.findById(userId);

            if(user.isEmpty()){
                return ResponseEntity.status(404).body(ResponseObject.builder().statusCode(404).message("User not found").build());
            }
            return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).message("get success").data(user.get()).build());
        }
        catch (Exception e){
            return ResponseEntity.status(500).body(ResponseObject.builder().statusCode(500).message(e.getMessage()).build());
        }
    }
}
