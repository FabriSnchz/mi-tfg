package com.tfg.levelUpZone.entities;

import com.tfg.levelUpZone.enums.RoleList;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "role_id")
	private Integer id;
	
	@Column(nullable = false)
	private RoleList name;
	
    public RoleList getName() {
        return name;
    }

    public void setName(RoleList name) {
        this.name = name;
    }
}
