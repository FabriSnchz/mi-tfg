package com.tfg.levelUpZone.game;

import java.sql.Date;
import java.util.List;

import com.tfg.levelUpZone.collection.Collection;
import com.tfg.levelUpZone.platform.Platform;

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
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
    
@Entity
@Table(name = "games")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Game {
    	
//      @ElementCollection
//      @CollectionTable(name = "juegos_plataformas", joinColumns = @JoinColumn(name = "id_juego"))
//      @Column(name = "plataforma")
//      private List<String> plataformas;

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "game_id")
    private Long id;

	private String name;
	private String genre;

    private Date release_date;

    private Boolean multiplayer;
    private String photo;

    @ManyToMany(mappedBy = "games")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Platform> platforms;

    @ManyToMany
    @JoinTable(name = "collections_games", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "collection_id"))
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Collection> collections;
    
    @Column(nullable = false)
    private String studio;
}