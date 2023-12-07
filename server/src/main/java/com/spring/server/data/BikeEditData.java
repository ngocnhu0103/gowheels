package com.spring.server.data;

import com.spring.server.models.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class BikeEditData {
    private String description;
    private Double price;
    private String color;
    private String place;
    private String city;

    private Double lat;
    private Double lng;
    private Double weekDiscount;
    private Double monthDiscount;
    private List<Long> tagList;
    private List<String> newImages;
    private List<Image> imageList;
}
