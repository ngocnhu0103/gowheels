package com.spring.server.repositories;

import com.spring.server.models.User;
import com.spring.server.models.VerifyOTP;
import org.springframework.data.repository.CrudRepository;

public interface VerifyOTPRepository extends CrudRepository<VerifyOTP,Long> {
    public VerifyOTP findByUser(User user);
    public VerifyOTP findByOtp(String otp);
}
