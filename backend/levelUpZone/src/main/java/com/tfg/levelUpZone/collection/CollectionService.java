package com.tfg.levelUpZone.collection;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.levelUpZone.game.Game;

import java.util.Collections;
import java.util.List;

@Service
public class CollectionService {

	@Autowired
    private CollectionRepository collectionRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public Collection saveCollectionWithGames(Collection collection, List<Long> gameIds) {
        // Guardar la colección
        Collection savedCollection = collectionRepository.save(collection);

        // Insertar en collections_games
        for (Long gameId : gameIds) {
            entityManager.createNativeQuery("INSERT INTO collections_games (collection_id, game_id) VALUES (?, ?)")
                         .setParameter(1, savedCollection.getId())
                         .setParameter(2, gameId)
                         .executeUpdate();
        }

        return savedCollection;
    }
    public List<Game> getGamesByCollectionId(Long collectionId) {
        return collectionRepository.findById(collectionId)
                .map(Collection::getGames)  // Aquí devuelve List<Game>
                .orElse(Collections.emptyList());
    }
}
