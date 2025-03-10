package com.tfg.levelUpZone;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "colecciones")
public class Coleccion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_coleccion")
    private Long id;
	private String nombre;
    private Long id_usuario;
    
    @ManyToMany(mappedBy = "colecciones")
    private List<Juego> juegos;
    
    public Coleccion(Long id, String nombre, Long id_usuario, List<Juego> juegos) {
 		super();
 		this.id = id;
 		this.nombre = nombre;
 		this.id_usuario = id_usuario;
 		this.juegos = juegos;
 	}
    
    public Coleccion() {
    	
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Long getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(Long id_usuario) {
		this.id_usuario = id_usuario;
	}

	public List<Juego> getJuegos() {
		return juegos;
	}

	public void setJuegos(List<Juego> juegos) {
		this.juegos = juegos;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, id_usuario, juegos, nombre);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Coleccion other = (Coleccion) obj;
		return Objects.equals(id, other.id) && Objects.equals(id_usuario, other.id_usuario)
				&& Objects.equals(juegos, other.juegos) && Objects.equals(nombre, other.nombre);
	}

	@Override
	public String toString() {
		return "Coleccion [id=" + id + ", nombre=" + nombre + ", id_usuario=" + id_usuario + ", juegos=" + juegos + "]";
	}
    
    
}
