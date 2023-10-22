package com.spring.server.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="report")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Report implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @JsonIgnoreProperties({ "likes", "bikes" })
    @ManyToOne(fetch = FetchType.EAGER)
    private User reporter;
    @JsonIgnoreProperties({ "likes", "bikes" })
    @ManyToOne(fetch = FetchType.EAGER)
    private User reportedPerson;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date timeReport;
    private String content;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    private List<Image> imageList;
    private String status;
}
