package com.spring.server.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.*;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Table(name="booking")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "@Id")

public class Booking implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    @ManyToOne(fetch = FetchType.EAGER)
    private Bike bike;
    @JsonIgnoreProperties({"accountNumber", "createdAt", "role", "likes","balance"})
    @ManyToOne(fetch = FetchType.EAGER)
    private User renter;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date endDate;
    private Double totalPrice;
    private String note;
    private Double surchargePrice;
    private String paymentMethod;
    private boolean isDeposit;
    private boolean reviewed;
    @ColumnDefault(value = "false")
    private boolean reported;
    private String status;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    private List<Surcharge> surchargeList;

    @CreationTimestamp
    private Instant createdOn;
    @UpdateTimestamp
    private Instant lastUpdatedOn;

}
