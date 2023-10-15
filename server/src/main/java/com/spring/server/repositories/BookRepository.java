package com.spring.server.repositories;

import com.spring.server.models.Bike;
import com.spring.server.models.Booking;
import com.spring.server.models.User;
import com.spring.server.models.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface BookRepository extends CrudRepository<Booking, Long> {
    public List<Booking> findAllByBike(Bike bike);
    public List<Booking> findAllByRenter(User renter);

    public List<Booking> findAllByBikeAndStartDateAndEndDate(Bike bike, Date startDate, Date endDate);

}
