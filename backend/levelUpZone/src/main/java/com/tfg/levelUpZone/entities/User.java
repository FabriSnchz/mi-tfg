package com.tfg.levelUpZone.entities;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
    private Long id;
	
	@NotBlank
	@Column(unique = true, nullable = false, name = "user_name")
	private String userName;
	
	@NotBlank
	@Column(nullable = false)
	private String password;
	
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
    
    @NotBlank
    @Column(nullable = false, name = "full_name")
    private String fullName;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "birth_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    
    @Column(name = "profile_image")
    private String profileImage;

    public User(String userName, String password, String fullName, String email, LocalDate birthDate, Role role, String profileImage) {
        this.userName = userName;
        this.password = password;
        this.fullName = fullName;
        this.email = email;
        this.birthDate = birthDate;
        this.role = role;
        this.profileImage = profileImage;
    }
}
