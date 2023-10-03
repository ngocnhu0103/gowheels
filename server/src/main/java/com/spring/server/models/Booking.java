package com.spring.server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Table(name="booking")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Booking implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    @ManyToOne(fetch = FetchType.LAZY)
    private Bike bike;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude // không sử dụng trường này trong equals và hashcode
    @ToString.Exclude
    private UserModel renter;
//    @DateTimeFormat()
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date endDate;
    private Double totalPrice;
    private String paymentMethod;
    private String status;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    private List<Surcharge> surchargeList;

}
