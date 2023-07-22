package com.spring.server.data;

import com.spring.server.models.Category;
import com.spring.server.models.Place;
import com.spring.server.models.Tag;
import com.spring.server.models.UserModel;
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
    private String placeId;
    private List<Long> tagList;
}
