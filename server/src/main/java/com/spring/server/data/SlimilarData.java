package com.spring.server.data;

import com.spring.server.models.Bike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class SlimilarData {
    List<Bike> similar1;
    List<Bike> similar2;
    List<Bike> similar3;
}
