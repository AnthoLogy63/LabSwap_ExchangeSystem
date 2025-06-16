package com.example.backend.security;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class JwtUtil {

    private static final String SECRET_KEY = "5f3A7B9C2dE6G8H1jKlMnOpQrStUvWxYz1234567890ABCDEF==";

    public static SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
