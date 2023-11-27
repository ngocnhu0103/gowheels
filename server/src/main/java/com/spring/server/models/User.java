package com.spring.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.List;

@Getter
@Setter
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
    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private Image avatar;
    private String accountNumber;
    private String cmnd;
    @ColumnDefault(value = "0")
    private Double balance;
    private int point;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Bike> likes;
    private boolean isJobber;
    @JsonIgnore
    @OneToMany(mappedBy = "owner",fetch = FetchType.EAGER)
    private List<Bike> bikes ;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean enabled;
}
