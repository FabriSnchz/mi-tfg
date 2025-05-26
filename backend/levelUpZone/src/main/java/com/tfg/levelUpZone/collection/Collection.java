package com.tfg.levelUpZone.collection;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tfg.levelUpZone.game.Game;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "collections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "collection_id")
    private Long id;

    private String name;
    
    @Column(name = "user_id")
    private Long userId;

    @ManyToMany
    @JoinTable(name = "collections_games", joinColumns = @JoinColumn(name = "collection_id"), inverseJoinColumns = @JoinColumn(name = "game_id"))
    @JsonManagedReference
    private List<Game> games;
}
