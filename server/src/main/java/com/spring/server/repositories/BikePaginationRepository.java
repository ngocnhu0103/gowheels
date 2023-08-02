package com.spring.server.repositories;

import com.spring.server.models.Bike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BikePaginationRepository extends PagingAndSortingRepository<Bike,Long> {
    public Page<Bike> findByBikeNameContaining(String bikeName, Pageable pageable);

}
