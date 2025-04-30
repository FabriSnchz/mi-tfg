package com.tfg.levelUpZone.dtos;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewUserDto {
    @NotBlank(message = "El nombre de usuario es obligatorio")
	public String userName;
    @NotBlank(message = "La contraseña es obligatoria")
	public String password;
}
