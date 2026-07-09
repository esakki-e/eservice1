package com.eservice1.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
@Service
public class JwtService {

    private final String secret;

    private final SecretKey key;
    private static final long EXPIRATION_TIME =
            24 * 60 * 60 * 1000;
    public JwtService(
            @Value("${jwt.secret}") String secret
    ) {

        this.secret = secret;

        this.key = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );

    }
    public String generateToken(String phoneNumber) {

        return Jwts.builder()
                .subject(phoneNumber)
                .issuedAt(new Date()).expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )
                .signWith(key)
                .compact();
    }

    public String extractPhoneNumber(
            String token) {

        Claims claims =
                Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

        return claims.getSubject();
    }

    public boolean isValid(String token) {

        try {

            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);

            //System.out.println("TOKEN IS VALID");

            return true;

        } catch (Exception e) {

           // e.printStackTrace();

            return false;
        }
    }
}