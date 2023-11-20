package com.spring.server.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@Table(name="bikes")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "@bikeId")
public class Bike implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikeId;
    private String bikeName;
    @Length(max = 500)
    private String description;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Image> images;
    private Double price;
    private Double weekDiscount;
    private Double monthDiscount;
    private String status;
    private String color;
    @Column(unique = true)
    private String bikeCode;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    private Category category;
    private String place;
    @JsonIgnoreProperties
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "bike_tag",
            joinColumns = @JoinColumn(name = "bikeId"),
            inverseJoinColumns = @JoinColumn(name = "tagId"))
    private List<Tag> tagList;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    private User owner;

    private Double lat;
    private Double lng;

    @CreationTimestamp
    private Instant createdOn;
    @UpdateTimestamp
    private Instant lastUpdatedOn;

}