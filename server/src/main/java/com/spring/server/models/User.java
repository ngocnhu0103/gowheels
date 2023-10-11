package com.spring.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Vui lòng nhập email")
    @Column(unique = true)
    private String email;
    private String gender;
    @CreatedDate
    private Date createdAt;
    @NotBlank(message = "Vui lòng nhập password")
    @JsonIgnore
    private String password;
    private String fullName;
    private String phone;
    private String address;
    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Image avatar;
    private String accountNumber;
    private Double balance;
    private int point;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Bike> likes;
    private boolean isJobber;
    @OneToMany(mappedBy = "owner",fetch = FetchType.EAGER)
    private List<Bike> bikes ;
    @Enumerated(EnumType.STRING)
    private Role role;
    @JsonIgnore
    private String verificationCode;
    private boolean enabled;
}
