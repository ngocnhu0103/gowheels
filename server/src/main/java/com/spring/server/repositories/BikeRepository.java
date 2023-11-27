package com.spring.server.repositories;

import com.spring.server.models.Bike;
import com.spring.server.models.Tag;
import com.spring.server.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BikeRepository extends CrudRepository<Bike,Long> {
    public Bike findByBikeCode(String bikdeCode);
    public List<Bike> findAllByOwner(User owner);

    public List<Bike> findByCategoryCategoryNameAndStatusAndTagListInAndColorAndCityAndBikeIdIsNot
            (String categoryName,String status,List<Tag> tagList,String color,String city,Long bikeId);
    public List<Bike> findByCategoryCategoryNameAndStatusAndColorAndCityAndBikeIdIsNot
            (String categoryName,String status,String color,String city,Long bikeId);
    public List<Bike> findByCategoryCategoryNameAndStatusAndCityAndBikeIdIsNot
            (String categoryName,String status,String city,Long bikeId);
}
