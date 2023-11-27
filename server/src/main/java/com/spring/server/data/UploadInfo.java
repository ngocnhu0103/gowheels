package com.spring.server.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class UploadInfo {
    private String address;
    private String phone;
    private String accountNumber;
    private String cmnd;
}
