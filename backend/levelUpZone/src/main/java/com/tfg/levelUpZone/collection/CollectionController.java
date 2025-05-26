package com.tfg.levelUpZone.collection;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.tfg.levelUpZone.game.Game;
import com.tfg.levelUpZone.game.GameRepository;
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
	
	@Autowired
	private GameRepository gameRepository;
	
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
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> getCollectionById(@PathVariable Long id) {
    	Optional<Collection> collection = collectionRepository.findById(id);
        
        if (collection.isEmpty()) {
            return ResponseEntity.status(404).body("No collections found with ID: " + id);
        }

        return ResponseEntity.ok(collection);
    }
    
    @GetMapping("/{id}/games")
    public ResponseEntity<List<Game>> getGamesByCollection(@PathVariable Long id) {
        List<Game> games = collectionService.getGamesByCollectionId(id);
        if (games.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(games);
        }
        return ResponseEntity.ok(games);
    }
    
    @PostMapping("/{collectionId}/games/{gameId}")
    public ResponseEntity<?> addGameToCollection(@PathVariable Long collectionId, @PathVariable Long gameId) {
        Optional<Collection> collectionOpt = collectionRepository.findById(collectionId);
        Optional<Game> gameOpt = gameRepository.findById(gameId);

        if (collectionOpt.isEmpty() || gameOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collection or Game not found");
        }

        Collection collection = collectionOpt.get();
        Game game = gameOpt.get();

        // ⚠️ Verificar que la lista no sea null
        if (collection.getGames() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Collection's game list is not initialized");
        }

        // Evitar duplicados
        if (!collection.getGames().contains(game)) {
            collection.getGames().add(game);
            collectionRepository.save(collection);
            return ResponseEntity.ok(collection);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Game already in collection");
        }
    }


}