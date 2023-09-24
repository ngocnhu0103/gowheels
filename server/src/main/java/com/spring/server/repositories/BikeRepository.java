package com.spring.server.repositories;

import com.spring.server.models.Bike;
import com.spring.server.models.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BikeRepository extends CrudRepository<Bike,Long> {
    public Bike findByBikeCode(String bikdeCode);
    public List<Bike> findAllByOwner(UserModel owner);
}
