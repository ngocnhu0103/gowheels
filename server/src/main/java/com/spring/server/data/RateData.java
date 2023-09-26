package com.spring.server.data;

import lombok.Data;

import java.util.Date;

@Data
public class RateData {
    private String ownerId;
    private Date createdAt;
    private int startNumber;
    private String content;
}
