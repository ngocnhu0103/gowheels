package com.spring.server.data;

import lombok.Data;

import java.util.Date;

@Data
public class RateData {
    private Long ownerId;
    private Long bookId;
    private Date createdAt;
    private int startNumber;
    private String content;
}
