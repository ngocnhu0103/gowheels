package com.spring.server.repositories;

import com.spring.server.models.Bike;
import com.spring.server.models.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BikePaginationRepository extends PagingAndSortingRepository<Bike,Long> {
    public Page<Bike> findByBikeNameContaining(String bikeName, Pageable pageable);
    public Page<Bike> findByBikeNameContainingAndTagListIn(String bikeName, Pageable pageable, List<Tag> tags);

    public Page<Bike> findByPlaceContaining(String place, Pageable pageable);
  

}
