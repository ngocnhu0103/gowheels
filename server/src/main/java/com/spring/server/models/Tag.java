package com.spring.server.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name="tags")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;


    @Column(unique = true)
    private String tagName;
    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "tagList")
    List<Bike> bikes;
}
