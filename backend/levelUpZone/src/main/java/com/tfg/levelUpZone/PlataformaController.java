package com.tfg.levelUpZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/plataformas")
public class PlataformaController {

	@Autowired
	private final PlataformaRepository plataformaRepository;
	private PlataformaController(PlataformaRepository plataformaRepository) {
		this.plataformaRepository = plataformaRepository;
	}
	
	@GetMapping
	public ResponseEntity<Object> findAll(){
		return ResponseEntity.ok().body(plataformaRepository.findAll());
	}
}