package com.tfg.levelUpZone.collection;

import java.util.List;

import com.tfg.levelUpZone.game.Game;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    private Long user_id;

    @ManyToMany(mappedBy = "collections")
    private List<Game> games;
}
