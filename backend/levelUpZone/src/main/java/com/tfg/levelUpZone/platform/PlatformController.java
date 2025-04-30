package com.tfg.levelUpZone.platform;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/platforms")
public class PlatformController {

	@Autowired
	private final PlatformRepository platformRepository;
	private PlatformController(PlatformRepository platformRepository) {
		this.platformRepository = platformRepository;
	}
	
	@GetMapping
	public ResponseEntity<Object> findAll(){
		return ResponseEntity.ok().body(platformRepository.findAll());
	}
}