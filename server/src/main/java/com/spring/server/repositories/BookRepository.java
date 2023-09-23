package com.spring.server.repositories;

import com.spring.server.models.Bike;
import com.spring.server.models.Booking;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Booking, Long> {
    public List<Booking> findAllByBike(Bike bike);

}
