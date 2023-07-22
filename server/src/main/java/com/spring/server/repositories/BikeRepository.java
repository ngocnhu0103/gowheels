package com.spring.server.repositories;

import com.spring.server.models.Bike;
import org.springframework.data.repository.CrudRepository;

public interface BikeRepository extends CrudRepository<Bike,Long> {
    public Bike findByBikeCode(String bikdeCode);

}
