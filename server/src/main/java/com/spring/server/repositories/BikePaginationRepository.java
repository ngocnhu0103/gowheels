package com.spring.server.repositories;

import com.spring.server.models.Bike;
import com.spring.server.models.Category;
import com.spring.server.models.Tag;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BikePaginationRepository extends PagingAndSortingRepository<Bike,Long> {
    public Page<Bike> findByBikeNameContainingAndStatus(String bikeName, Pageable pageable, String status);
    public Page<Bike> findByPlaceContainingAndCategoryCategoryNameContainingAndStatusAndTagListIn
            (Pageable pageable, String place,String categoryName,String status,List<Tag> tagList);
    public Page<Bike> findByCategoryCategoryNameContainingAndStatusAndTagListIn
            (Pageable pageable,String categoryName,String status,List<Tag> tagList);
    public Page<Bike> findByPlaceContainingAndStatusAndTagListIn
            (Pageable pageable, String place,String status,List<Tag> tagList);
    public Page<Bike> findByPlaceContainingAndCategoryCategoryNameContainingAndStatus
            (Pageable pageable, String place,String categoryName,String status);
    public Page<Bike> findByCategoryCategoryNameContainingAndStatus
            (Pageable pageable, String categoryName,String status);
    public Page<Bike> findByTagListInAndStatus
            (Pageable pageable, List<Tag> tagList,String status);
    public Page<Bike> findByPlaceContainingAndStatus(String place, Pageable pageable, String status);
    public Page<Bike> findAllByStatus(Pageable pageable,String status);

    @Query("SELECT b.city, COUNT(b.city) AS cityCount FROM Bike b GROUP BY b.city ORDER BY cityCount DESC")
    public Page<Bike> findTop5CommonCities(Pageable pageable);
}
