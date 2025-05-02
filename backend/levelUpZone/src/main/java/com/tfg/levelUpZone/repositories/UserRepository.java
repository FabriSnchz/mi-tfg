package com.tfg.levelUpZone.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tfg.levelUpZone.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	Optional<User> findByUserName(String userName);
	boolean existsByUserName(String userName);
	
	Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
