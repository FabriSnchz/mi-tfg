package com.tfg.levelUpZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/colecciones")
public class ColeccionController {
	
	@Autowired
	private final ColeccionRepository coleccionRepository;
	private ColeccionController(ColeccionRepository coleccionRepository) {
		this.coleccionRepository = coleccionRepository;
	}
	
	@GetMapping
	public ResponseEntity<Object> findAll(){
		return ResponseEntity.ok().body(coleccionRepository.findAll());
	}
}