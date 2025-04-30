package com.tfg.levelUpZone.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tfg.levelUpZone.entities.Role;
import com.tfg.levelUpZone.enums.RoleList;



@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>{

    Optional<Role> findByName(RoleList name);
}
