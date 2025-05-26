package com.tfg.levelUpZone.platform;

import java.util.List;

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
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "platforms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "platform_id")
    private Long id;

    private String name;

//    @ManyToMany
//    @JoinTable(
//        name = "games_platforms",
//        joinColumns = @JoinColumn(name = "platform_id"),
//        inverseJoinColumns = @JoinColumn(name = "game_id")
//    )
//    @ToString.Exclude
//    @EqualsAndHashCode.Exclude
//    private List<Game> games;
}