package com.example.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    public String generateToken(String email, String name, String role) {
        long expirationMs = 1000 * 60 * 60 * 24; // 24 horas

        return Jwts.builder()
                .setSubject(email)
                .claim("name", name)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(JwtUtil.getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
