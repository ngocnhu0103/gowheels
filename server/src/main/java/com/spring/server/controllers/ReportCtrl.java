package com.spring.server.controllers;

import com.spring.server.data.ReportData;
import com.spring.server.data.ResponseObject;
import com.spring.server.data.StatusData;
import com.spring.server.services.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/report")
@RequiredArgsConstructor
public class ReportCtrl {
    private final ReportService reportService;
    @GetMapping
    public ResponseEntity<ResponseObject> getAll(
            @RequestParam(required = false, defaultValue = "0") int pageNo,
            @RequestParam(required = false, defaultValue = "10") int pageSize,
            @RequestParam(required = false, defaultValue = "DESC") String sorted,
            @RequestParam(required = false, defaultValue = "") String status
    ) {
        return reportService.getAll(sorted,pageNo,pageSize,status);
    }
    @PostMapping
    public ResponseEntity<ResponseObject> reporting(
            @RequestBody ReportData reportData,
            Authentication authentication
            ) {
        return reportService.reporting(reportData,authentication);
    }
    @PutMapping("/{reportId}")
    public ResponseEntity<ResponseObject> solveReport(
            @PathVariable Long reportId,
            @RequestBody StatusData statusData
    ) {
        System.out.println("reportId = " + reportId);
        System.out.println("reportId = " + statusData.getNewStatus());
        return reportService.solveReport(reportId,statusData.getNewStatus());
    }
    @GetMapping("/{reportId}")
    public ResponseEntity<ResponseObject> getOne(
            @PathVariable Long reportId
    ) {
        return reportService.getOne(reportId);
    }
    @GetMapping("/author")
    public ResponseEntity<ResponseObject> getAllByReporter(
            Authentication authentication
            ) {
        return reportService.getAllByReporter(authentication);
    }
}
