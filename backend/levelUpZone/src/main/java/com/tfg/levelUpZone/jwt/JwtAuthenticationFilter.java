package com.tfg.levelUpZone.jwt;

import com.tfg.levelUpZone.Services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@NoArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	//Implementación del filtro que servirá a nosotros en cada petición http que se haga en el servidor
	// Obtiene el token de autenticación
	
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private UserService userService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {

	    String path = request.getServletPath();
	    
	    // Ignorar rutas públicas
	    if (path.equals("/auth/login") || path.equals("/auth/register")) {
	        filterChain.doFilter(request, response);
	        return;
	    }
	    
	    final String authorizationHeader = request.getHeader("Authorization");
	    
	    System.out.println("Authorization header: " + authorizationHeader); // ----------
	    
	    String userName = null;
	    String jwt = null;
	    
	    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
	        jwt = authorizationHeader.substring(7);
	        try {
	            userName = jwtUtil.extractUserName(jwt);
	            System.out.println("Username extracted from JWT: " + userName); // ---------
	        } catch (Exception e) {
	            // loguear pero continuar sin interrumpir la petición
	            logger.warn("Token JWT inválido: " + e.getMessage());
	        }
	    }


	    if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	        UserDetails userDetails = userService.loadUserByUsername(userName);
	        System.out.println("UserDetails loaded: " + userDetails.getUsername()); // ---------

	        try {
	            if (jwtUtil.validateToken(jwt, userDetails)) {
	            	System.out.println("JWT valid. Setting authentication context..."); // ------
	                UsernamePasswordAuthenticationToken authToken =
	                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(authToken);
	            }
	        } catch (Exception e) {
	            logger.warn("Error al validar el token JWT: " + e.getMessage());
	        }
	    }

	    filterChain.doFilter(request, response);
	}
}