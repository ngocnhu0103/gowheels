package com.spring.server.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
   private String email;
   private String password;
   private String repeatPassword;
   private String fullName;
   private String gender;
}
