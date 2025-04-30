package com.tfg.levelUpZone.jwt;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtEntryPoint implements AuthenticationEntryPoint{
	// Devolver un error en el http response cuando un usuario no este autentificado, con un mesnaje de tipo String
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException{
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No autorizado");
    }
}
