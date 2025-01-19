package com.tfg.levelUpZone;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface JuegoRepository extends CrudRepository<Juego, Long>, PagingAndSortingRepository<Juego, Long>{

}