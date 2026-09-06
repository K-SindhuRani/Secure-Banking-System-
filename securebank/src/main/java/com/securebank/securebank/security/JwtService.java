package com.securebank.securebank.security;

import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "SecureBankApplicationSecretKeyForJWTAuthentication2026";

    private static final long EXPIRATION_TIME =
            1000L * 60 * 60 * 24;

    // ==============================
    // GENERATE TOKEN
    // ==============================

    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )
                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET_KEY
                )
                .compact();
    }

    // ==============================
    // EXTRACT EMAIL
    // ==============================

    public String extractEmail(String token) {

        Claims claims =
                Jwts.parser()
                        .setSigningKey(SECRET_KEY)
                        .parseClaimsJws(token)
                        .getBody();

        return claims.getSubject();
    }

    // ==============================
    // VALIDATE TOKEN
    // ==============================

    public boolean validateToken(String token) {

        try {

            Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}