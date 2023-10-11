package com.spring.server.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.sql.results.graph.collection.internal.SetInitializer;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Table(name ="categories")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Category implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;
    @Column(unique=true)
    private String categoryName;





}
