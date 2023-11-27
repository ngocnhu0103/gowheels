package com.spring.server.data;

import com.spring.server.models.Bike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class SearchData {
    private List<Bike> bikeList;
    private Long totals;
}
