package com.spring.server.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "verify_otp")
public class VerifyOTP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String otp;
    @OneToOne(fetch = FetchType.EAGER)
    private User user;
    private Date expiryDate;
}
