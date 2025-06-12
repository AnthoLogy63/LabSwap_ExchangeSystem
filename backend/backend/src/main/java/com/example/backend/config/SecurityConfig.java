package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors() // Habilita CORS
            .and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll() // Permite todo sin login
                .anyRequest().permitAll()
            );

        return http.build();
    }

    // Config global de CORS
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("*")
                    .allowedHeaders("*");
            }
        };
    }
}
