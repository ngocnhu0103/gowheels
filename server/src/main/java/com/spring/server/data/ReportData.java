package com.spring.server.data;

import com.spring.server.models.Image;
import com.spring.server.models.UserModel;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ReportData {
    private Long reportedPerson;
    private Long bookId;
    private Date timeReport;
    private String content;
    private List<String> imageList;
}
