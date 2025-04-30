package com.tfg.levelUpZone.collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/collections")
public class CollectionController {
	
	@Autowired
	private final CollectionRepository collectionRepository;
	private CollectionController(CollectionRepository collectionRepository) {
		this.collectionRepository = collectionRepository;
	}
	
	@GetMapping
	public ResponseEntity<Object> findAll(){
		return ResponseEntity.ok().body(collectionRepository.findAll());
	}
}