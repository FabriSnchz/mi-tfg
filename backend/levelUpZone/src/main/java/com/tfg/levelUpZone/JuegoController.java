package com.tfg.levelUpZone;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/juegos")
public class JuegoController {
	
	@Autowired
	private final JuegoRepository juegoRepository;
	private JuegoController(JuegoRepository juegoRepository) {
		this.juegoRepository = juegoRepository;
	}
	
	@GetMapping
	public ResponseEntity<Object> findAll(){
		return ResponseEntity.ok().body(juegoRepository.findAll());
	}
	
	@GetMapping("/{requestedId}")
	private ResponseEntity<Juego> findById(@PathVariable Long requestedId) {
		Optional<Juego> juegoOptional = juegoRepository.findById(requestedId);
		if(juegoOptional.isPresent()) {
		return ResponseEntity.ok(juegoOptional.get());
		} else {
		return ResponseEntity.notFound().build();
		}
	}
}