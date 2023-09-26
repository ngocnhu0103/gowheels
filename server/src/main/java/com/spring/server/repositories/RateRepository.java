package com.spring.server.repositories;

import com.spring.server.models.Rate;
import com.spring.server.models.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RateRepository extends CrudRepository<Rate,Long> {
    public List<Rate> findAllByOwner(UserModel owner);
}
