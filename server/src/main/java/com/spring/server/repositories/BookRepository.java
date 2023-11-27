package com.spring.server.repositories;

import com.spring.server.models.Bike;
import com.spring.server.models.Booking;
import com.spring.server.models.User;
import com.spring.server.models.UserModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Booking, Long> {
    public List<Booking> findByBike(Bike bike);
    public List<Booking> findByBikeAndStatusContaining(Bike bike,String status,Pageable pageable);
    public List<Booking> findByRenterAndStatusContaining(User renter, String status, Pageable pageable);
    public List<Booking> findAllByBikeAndStartDateAndEndDate(Bike bike, Date startDate, Date endDate);

}
