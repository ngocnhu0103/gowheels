package com.spring.server.repositories;

import com.spring.server.models.Report;
import com.spring.server.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface ReportPagingRepository extends PagingAndSortingRepository<Report,Long> {
    public List<Report> findAllByReporter(User reporter);
    public Page<Report> findByStatusContaining(String status, Pageable pageable);

}
