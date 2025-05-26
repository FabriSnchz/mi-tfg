package com.tfg.levelUpZone.game;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "game_id")
    private Long id;
	private String name;
	private String genre;
    private Date release_date;
    @ManyToMany
    @JoinTable(
        name = "games_platforms",
        joinColumns = @JoinColumn(name = "game_id"),
        inverseJoinColumns = @JoinColumn(name = "platform_id")
    )
    private List<Platform> platforms;
    private Boolean multiplayer;
    private String photo;
    @Column(nullable = false)
    private String studio;
    private String languages;
    private BigDecimal reviewScore;
    private String tags;
    private BigDecimal price;
    private String ageRating;
    private String description;
    @ManyToMany(mappedBy = "games")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private List<Collection> collections;


}