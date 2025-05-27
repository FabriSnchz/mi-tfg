package com.tfg.levelUpZone.dtos;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewUserDto {

    @NotBlank(message = "El nombre de usuario es obligatorio")
    private String userName;

    @NotBlank(message = "La contraseña es obligatoria")
    private String password;

    @NotBlank(message = "El nombre completo es obligatorio")
    private String fullName;

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El correo electrónico debe ser válido")
    private String email;

    @Past(message = "La fecha de nacimiento debe ser una fecha pasada")
    private LocalDate birthDate;
    
    @NotBlank(message = "La foto de perfil es obligatorio")
    private String profileImage;
}
