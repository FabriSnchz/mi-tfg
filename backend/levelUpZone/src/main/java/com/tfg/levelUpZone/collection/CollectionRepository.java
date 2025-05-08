package com.tfg.levelUpZone.collection;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRepository extends JpaRepository<Collection, Long>{

	List<Collection> findByUserId(Long userId);
}
