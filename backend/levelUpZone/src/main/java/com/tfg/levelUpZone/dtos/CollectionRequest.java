package com.tfg.levelUpZone.dtos;

import java.util.List;

import lombok.Data;

@Data
public class CollectionRequest {
    private String name;
    private List<Long> gameIds;
}
