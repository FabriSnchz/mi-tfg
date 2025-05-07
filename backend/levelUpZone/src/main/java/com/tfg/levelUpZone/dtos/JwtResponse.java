package com.tfg.levelUpZone.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String role;
    private String userName;
    private Long userId;
}

