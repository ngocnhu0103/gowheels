package com.spring.server.data;

import com.spring.server.models.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
@Builder
public class TagData {
    private String newTag;
}
