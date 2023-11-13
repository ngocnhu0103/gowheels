package com.spring.server.config;

//import com.spring.server.exception.AccessDeniedHandlerJwt;
//import com.spring.server.exception.AuthenticationEntryPointJwt;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;


    private final  AuthenticationProvider authenticationProvider;




    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        corsConfiguration.setAllowedOrigins(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT","OPTIONS","PATCH", "DELETE"));
        corsConfiguration.setExposedHeaders(List.of("Authorization"));

        http.cors(Customizer.withDefaults());
        http.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/v1/auth/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/v1/bike/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/v1/review/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/v1/user/getuser/**").permitAll()
                                .requestMatchers("/api/v1/tag/**").permitAll()
                                .anyRequest().authenticated()
                        );
        http.authenticationProvider(authenticationProvider);
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);


        http.exceptionHandling(exception -> exception.accessDeniedHandler((request, response, accessDeniedException) ->
                {
                    System.out.println(request);
//                            response.addHeader("Access-Control-Allow-Origin","*");
//                            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//
//                            final Map<String, Object> body = new HashMap<>();
//                            body.put("status", HttpServletResponse.SC_FORBIDDEN);
//                            body.put("error", "Forbidden");
//                            body.put("message", accessDeniedException.getMessage());
//                            body.put("path", request.getServletPath());
//
//                            final ObjectMapper mapper = new ObjectMapper();
//                            mapper.writeValue(response.getOutputStream(), body);
//                            response.flushBuffer();

                }

        ));
        http.exceptionHandling(exception -> exception.authenticationEntryPoint((request, response, authException) ->
                {

                    response.addHeader("Access-Control-Allow-Origin","*");
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

                    final Map<String, Object> body = new HashMap<>();
                    body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
                    body.put("error", "Unauthorized");
                    body.put("message", authException.getMessage());
                    body.put("path", request.getServletPath());

                    final ObjectMapper mapper = new ObjectMapper();
                    mapper.writeValue(response.getOutputStream(), body);
                    response.flushBuffer();

                }

        ));
        return http.build();
    }


}