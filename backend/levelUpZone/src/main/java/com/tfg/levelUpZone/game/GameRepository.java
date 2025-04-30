package com.tfg.levelUpZone.game;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface GameRepository extends CrudRepository<Game, Long>, PagingAndSortingRepository<Game, Long>{

}