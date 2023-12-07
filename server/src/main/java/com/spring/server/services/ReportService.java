package com.spring.server.services;

import com.spring.server.data.ReportData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Image;
import com.spring.server.models.Report;
import com.spring.server.repositories.BookRepository;
import com.spring.server.repositories.ReportPagingRepository;
import com.spring.server.repositories.ReportRepository;
import com.spring.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final ReportPagingRepository reportPagingRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    //@getAll
    public ResponseEntity<ResponseObject> getAll(String sorted,int pageNo,int pageSize,String status){
        try {
            Sort sort = Sort.by("timeReport");
            if(sorted == null ){
                sort = Sort.by("timeReport").descending();
            }else {
                if(sorted.compareTo("DESC") == 0) {
                    sort = Sort.by("timeReport").descending();
                }
                if(sorted.compareTo("ASC") == 0){
                    sort = Sort.by("timeReport").ascending();
                }
            }
            if(status == null) status = "";
            Pageable paging = PageRequest.of(pageNo, pageSize, sort);
            var reports = reportPagingRepository.findByStatusContaining(status,paging);
            return ResponseEntity.ok().body(ResponseObject.builder().message("get all success").statusCode(200).data(reports).build());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }

    //@reporting
    public ResponseEntity<ResponseObject> reporting(ReportData reportData, Authentication authentication){
        try {
            var book = bookRepository.findById(reportData.getBookId());
            var reporter = userRepository.findByEmail(authentication.getName());
            var reportedPerson = userRepository.findById(reportData.getReportedPerson());
            List<Image> images = new ArrayList<>();
            for(String t : reportData.getImageList()){
                Image img = new Image();
                img.setUrl(t);

                images.add(img);

            }
            var report = Report.builder().reporter(reporter.get())
                    .reportedPerson(reportedPerson.get())
                    .timeReport(reportData.getTimeReport())
                    .content(reportData.getContent())
                    .imageList(images)
                    .status("waiting").build();

            reportRepository.save(report);
            book.get().setReported(true);
            bookRepository.save(book.get());
            return ResponseEntity.ok().body(ResponseObject.builder().message("Báo cáo thành công").statusCode(200).data(report).build());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }
    //@solve report
    public ResponseEntity<ResponseObject> solveReport(Long id,String newStatus){
        try {
            var report = reportRepository.findById(id);
            System.out.println("report = " + report);
            if (report.isEmpty()){
                return  ResponseEntity.status(404).body(ResponseObject.builder().statusCode(404).message("Not found").build());
            }
            if(newStatus.compareTo("accept") == 0) {
                var owner = userRepository.findById(report.get().getReportedPerson().getId());
                var currPoints = owner.get().getPoint() - 5;
                System.out.println("currPoints = " + currPoints);
                owner.get().setPoint(currPoints);
                userRepository.save(owner.get());
            }
            report.get().setStatus(newStatus);
            reportRepository.save(report.get());
            return ResponseEntity.ok().body(ResponseObject.builder().message("Đã duyệt").statusCode(200).data(report).build());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }

    //Get one
    public ResponseEntity<ResponseObject> getOne(Long id){
        try {
            var report = reportRepository.findById(id);

            return ResponseEntity.ok().body(ResponseObject.builder().message("get success").statusCode(200).data(report).build());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }
    //@getAll
    public ResponseEntity<ResponseObject> getAllByReporter(Authentication authentication){
        try {
            var reporter = userRepository.findByEmail(authentication.getName());
            var reports = reportRepository.findAllByReporter(reporter.get());

            return ResponseEntity.ok().body(ResponseObject.builder().message("get all success").statusCode(200).data(reports).build());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }
}
