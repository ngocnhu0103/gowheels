package com.spring.server.repositories;

import com.spring.server.models.User;
import com.spring.server.models.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Long> {
    public Optional<User> findByEmail(String email);
//    public Optional<User> findByVerificationCode(String code);
}
