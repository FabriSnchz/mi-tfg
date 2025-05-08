package com.tfg.levelUpZone.collection;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.levelUpZone.dtos.CollectionRequest;
import com.tfg.levelUpZone.entities.User;
import com.tfg.levelUpZone.repositories.UserRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/collections")
public class CollectionController {
	
	@Autowired
	private CollectionRepository collectionRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CollectionService collectionService;
	
	@GetMapping
	public ResponseEntity<List<Collection>> findAll(){
		return ResponseEntity.ok().body(collectionRepository.findAll());
	}
	
	@PostMapping
	public ResponseEntity<Object> saveCollection(@RequestBody CollectionRequest collectionRequest) {
	    try {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
	            return ResponseEntity.status(401).body("Unauthorized: User not authenticated");
	        }

	        String username = ((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername();

	        User user = userRepository.findByUserName(username)
	                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

	        // Crear la Collection con el name y user_id
	        Collection collection = new Collection();
	        collection.setName(collectionRequest.getName());
	        collection.setUserId(user.getId());

	        // Guardar la colección y obtener la entidad persistida (con id generado)
	        Collection savedCollection = collectionRepository.save(collection);

	        return ResponseEntity.ok(savedCollection);
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body("Error saving collection: " + e.getMessage());
	    }
	}

    
    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getCollectionsByUserId(@PathVariable Long userId) {
        List<Collection> collections = collectionRepository.findByUserId(userId);
        
        if (collections.isEmpty()) {
            return ResponseEntity.status(404).body("No collections found for user with ID: " + userId);
        }

        return ResponseEntity.ok(collections);
    }
}