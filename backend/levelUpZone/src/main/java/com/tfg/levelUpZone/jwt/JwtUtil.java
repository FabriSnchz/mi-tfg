package com.tfg.levelUpZone.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}") // Define Valores que vienen del application.properties
    private String secret;

    @Value("${jwt.expiration}")
    private int expiration; // Expiración del Access Token en segundos

    @Value("${jwt.refreshExpiration}")
    private int refreshExpiration; // Expiración del Refresh Token en segundos

    // Método para generar el Access Token
    public String generateAccessToken(Authentication authentication) {
        UserDetails mainUser = (UserDetails) authentication.getPrincipal();
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder().setSubject(mainUser.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration * 1000L)) // Expira según 'expiration'
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Método para generar el Refresh Token
    public String generateRefreshToken(Authentication authentication) {
        UserDetails mainUser = (UserDetails) authentication.getPrincipal();
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder().setSubject(mainUser.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + refreshExpiration * 1000L)) // Expira según 'refreshExpiration'
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Validar si el token es válido
    public Boolean validateToken(String token, UserDetails userDetails){
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Verificar si el token está expirado
    public Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    // Extraer la fecha de expiración
    public Date extractExpiration(String token){
        return extractAllClaims(token).getExpiration();
    }

    // Extraer todos los claims (datos) del token
    public Claims extractAllClaims(String token){
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Extraer el username (o userId) del token
    public String extractUserName(String token){
        return extractAllClaims(token).getSubject();
    }

    // Extraer el User ID desde el token (si es necesario)
    public Long extractUserId(String token) {
        return Long.parseLong(extractUserName(token)); // Aquí asumo que el username es el userId
    }
}
