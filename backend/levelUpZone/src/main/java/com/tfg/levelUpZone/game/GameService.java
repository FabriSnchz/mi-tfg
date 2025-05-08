package com.tfg.levelUpZone.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Servicio para manejar la lógica de negocio de videojuegos.
 */
@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    /**
     * Elimina un videojuego por su ID.
     * @param id El ID del videojuego a eliminar.
     */
    public void deleteGameById(Long id) {
        gameRepository.deleteById(id);
    }
}
