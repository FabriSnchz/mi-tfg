package com.tfg.levelUpZone.collection;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CollectionRepository extends CrudRepository<Collection, Long>{

	List<Collection> findByUserId(Long userId);
}
