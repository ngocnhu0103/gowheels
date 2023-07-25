package com.spring.server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name="bikes")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikeId;
    private String bikeName;
    private String description;
    private Double price;
    private String status;
    private String color;
    @Column(unique = true)
    private String bikeCode;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Category categoryId;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Place placeId;
    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(
            name = "bike_tag",
            joinColumns = @JoinColumn(name = "bikeId"),
            inverseJoinColumns = @JoinColumn(name = "tagId"))
    private List<Tag> tagList;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private UserModel owner;
}
