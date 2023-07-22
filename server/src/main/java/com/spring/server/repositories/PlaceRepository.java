package com.spring.server.repositories;

import com.spring.server.models.Place;
import org.springframework.data.repository.CrudRepository;

public interface PlaceRepository extends CrudRepository<Place,String> {

}
