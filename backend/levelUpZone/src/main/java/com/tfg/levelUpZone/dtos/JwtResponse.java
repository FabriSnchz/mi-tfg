package com.tfg.levelUpZone.dtos;

public class JwtResponse {
    private String token;
    private String role;

    // Constructor con parámetros jwt y role
    public JwtResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // Getter y Setter para token
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    // Getter y Setter para role
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
