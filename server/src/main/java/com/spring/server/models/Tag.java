package com.spring.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Table(name="tags")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String tagId;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Category> categoryList ;
    @Column(unique = true)
    private String tagName;
}
