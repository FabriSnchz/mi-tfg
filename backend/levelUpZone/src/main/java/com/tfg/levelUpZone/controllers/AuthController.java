package com.tfg.levelUpZone.controllers;

import com.tfg.levelUpZone.dtos.JwtResponse;
import com.tfg.levelUpZone.dtos.LoginUserDto;
import com.tfg.levelUpZone.dtos.NewUserDto;
import com.tfg.levelUpZone.entities.Role;
import com.tfg.levelUpZone.entities.User;
import com.tfg.levelUpZone.enums.RoleList;
import com.tfg.levelUpZone.jwt.JwtUtil;
import com.tfg.levelUpZone.repositories.RoleRepository;
import com.tfg.levelUpZone.repositories.UserRepository;
import com.tfg.levelUpZone.ErrorResponse;
import com.tfg.levelUpZone.Services.AuthService;
import com.tfg.levelUpZone.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private UserService userService;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;
    private JwtUtil jwtUtil;

    @Autowired
    public AuthController(AuthService authService, UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository,
            UserService userService, JwtUtil jwtUtil) {
		this.authService = authService;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.roleRepository = roleRepository;
		this.userService = userService;
		this.jwtUtil = jwtUtil;
		}
    
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginUserDto loginUserDto, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().build();
        }
        try {
            // Autenticar al usuario y generar el JWT
            String jwt = authService.authenticate(loginUserDto.getUserName(), loginUserDto.getPassword());

            // Obtener el usuario desde la base de datos
            User user = userRepository.findByUserName(loginUserDto.getUserName()).orElseThrow();
            String role = user.getRole().getName().name();
            String userName = user.getUserName();
            Long userId = user.getId();
            String profileImage = user.getProfileImage();

            return ResponseEntity.ok(new JwtResponse(jwt, role, userName, userId, profileImage));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JwtResponse("Credenciales incorrectas", null, null, null, null));
        }
    }

    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody NewUserDto newUserDto, BindingResult bindingResult) {

    	Role roleGuest = roleRepository.findByName(RoleList.ROLE_USER)
    	        .orElseThrow(() -> new RuntimeException("Rol ROLE_USER no encontrado"));
    	
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Error: " + bindingResult.getAllErrors().get(0).getDefaultMessage());
        }

        // Validar si el nombre de usuario ya existe
        if (userRepository.existsByUserName(newUserDto.getUserName())) {
            return ResponseEntity.badRequest().body("Error: Nombre de usuario ya está en uso");
        }

        // Validar si el correo electrónico ya está registrado
        if (userRepository.existsByEmail(newUserDto.getEmail())) {
            return ResponseEntity.badRequest().body("Error: El correo electrónico ya está en uso");
        }

        // Cifrar la contraseña
        String encodedPassword = passwordEncoder.encode(newUserDto.getPassword());

        // Crear el nuevo usuario con los datos proporcionados
        User newUser = new User(
            newUserDto.getUserName(),
            encodedPassword,
            newUserDto.getFullName(),
            newUserDto.getEmail(),
            newUserDto.getBirthDate(),
            roleGuest,  // Asumiendo que ya se tiene el rol y es GUEST
            newUserDto.getProfileImage()
        );

        // Guardar el nuevo usuario en la base de datos
        userRepository.save(newUser);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario registrado exitosamente");
        return ResponseEntity.ok(response);

    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        // Validación de entrada
        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("El refresh token es obligatorio."));
        }

        try {
            // Validar si el refresh token está expirado
            String username = jwtUtil.extractUserName(refreshToken);

            if (jwtUtil.isTokenExpired(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("El refresh token ha expirado."));
            }

            // Buscar el usuario por el nombre de usuario
            User user = userRepository.findByUserName(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el nombre: " + username));

            // Construir el objeto UserDetails para la autenticación
            UserDetails userDetails = userService.loadUserByUsername(user.getUserName());
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            // Generar un nuevo token de acceso
            String newAccessToken = jwtUtil.generateAccessToken(authentication);

            // Devolver el nuevo JWT junto con el rol y el ID de usuario
            JwtResponse jwtResponse = new JwtResponse(newAccessToken, user.getRole().getName().name(), user.getUserName(), user.getId(), user.getProfileImage());
            return ResponseEntity.ok(jwtResponse);

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Usuario no encontrado."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Refresh token inválido."));
        }
    }

    @GetMapping("/check-auth")
    public ResponseEntity<String> checkAuth(){
            return ResponseEntity.ok().body("Autenticado");
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        
        // Respondemos con un código 204 si la eliminación fue exitosa
        return ResponseEntity.noContent().build();
    }  
}