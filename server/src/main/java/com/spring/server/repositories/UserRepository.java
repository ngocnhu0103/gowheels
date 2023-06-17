package com.spring.server.repositories;

import com.spring.server.models.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserModel,String> {
    public Optional<UserModel> findByEmail(String email);
    public Optional<UserModel> findByVerificationCode(String code);
}
