package com.spring.server.data;

import com.spring.server.models.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class BikeData {
    private String bikeName;
    private String description;
    private Double price;
    private String status;
    private String color;
    private String bikeCode;
    private Long categoryId;
    private String place;
    private String city;

    private Double lat;
    private Double lng;
    private Double weekDiscount;
    private Double monthDiscount;
    private List<Long> tagList;
    private List<String> images;
}
