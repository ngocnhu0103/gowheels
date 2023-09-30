package com.spring.server.services;

import com.spring.server.data.ReportData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Image;
import com.spring.server.models.Report;
import com.spring.server.repositories.ReportRepository;
import com.spring.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    //@getAll
    public ResponseEntity<ResponseObject> getAll(){
        try {
            var reports = reportRepository.findAll();

            return ResponseEntity.ok().body(ResponseObject.builder().message("get all success").statusCode(200).data(reports).build());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }

    //@reporting
    public ResponseEntity<ResponseObject> reporting(ReportData reportData, Authentication authentication){
        try {
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
                    .status("Cho xet duyet").build();

            return ResponseEntity.ok().body(ResponseObject.builder().message("post success").statusCode(200).data(report).build());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(ResponseObject.builder().message(e.getMessage()).build());
        }
    }
    //@solve report
    public ResponseEntity<ResponseObject> solveReport(Long id,String newStatus){
        try {
            var report = reportRepository.findById(id);
            if (!report.isEmpty()){
                return  ResponseEntity.status(404).body(ResponseObject.builder().statusCode(404).message("Not found").build());
            }
            report.get().setStatus(newStatus);
            reportRepository.save(report.get());
            return ResponseEntity.ok().body(ResponseObject.builder().message("get success").statusCode(200).data(report).build());
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
