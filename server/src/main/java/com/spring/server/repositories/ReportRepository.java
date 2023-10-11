package com.spring.server.repositories;

import com.spring.server.models.Report;
import com.spring.server.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReportRepository extends CrudRepository<Report,Long> {
    public List<Report> findAllByReporter(User reporter);
}
