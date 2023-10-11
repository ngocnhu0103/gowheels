package com.spring.server.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
public class BookData {
    private Long bikeId;
    private Date startDate;
    private Date endDate;
    private Double totalPrice;
    private String paymentMethod;

}
