package com.tfg.levelUpZone.game;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/games")
public class GameController {
	
	@Autowired
	private final GameRepository gameRepository;
	private final GameService gameService;
	private GameController(GameRepository gameRepository, GameService gameService) {
		this.gameRepository = gameRepository;
		this.gameService = gameService;
	}
	
	@GetMapping
	public ResponseEntity<List<Game>> findAll(){
	    return ResponseEntity.ok().body(gameRepository.findAll());
	}
	
	@GetMapping("/{requestedId}")
	private ResponseEntity<Game> findById(@PathVariable Long requestedId) {
		Optional<Game> gameOptional = gameRepository.findById(requestedId);
		if(gameOptional.isPresent()) {
		return ResponseEntity.ok(gameOptional.get());
		} else {
		return ResponseEntity.notFound().build();
		}
	}
	
    @DeleteMapping("/games/{id}")
    public void deleteGame(@PathVariable Long id) {
        gameService.deleteGameById(id);
    }
}