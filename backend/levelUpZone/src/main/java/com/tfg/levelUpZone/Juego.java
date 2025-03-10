package com.tfg.levelUpZone;

import java.sql.Date;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "juegos")
public class Juego {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_juego")
    private Long id;
    private String nombre;
    private String genero;
    private Date fecha_lanzamiento;
    private Boolean multijugador;
    private String foto;
    
//    @ElementCollection
//    @CollectionTable(name = "juegos_plataformas", joinColumns = @JoinColumn(name = "id_juego"))
//    @Column(name = "plataforma")
//    private List<String> plataformas;
    
    @ManyToMany(mappedBy = "juegos")
    private List<Plataforma> plataformas;
    
    @ManyToMany
    @JoinTable(
        name = "colecciones_juegos",
        joinColumns = @JoinColumn(name = "id_juego"),
        inverseJoinColumns = @JoinColumn(name = "id_coleccion")
    )
    private List<Coleccion> colecciones;
    
    public Juego(Long id, String nombre, String genero, Date fecha_lanzamiento, List<Plataforma> plataformas,
			Boolean multijugador, String foto) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.genero = genero;
		this.fecha_lanzamiento = fecha_lanzamiento;
		this.plataformas = plataformas;
		this.multijugador = multijugador;
		this.foto = foto;
	}

	public Juego() {
    	
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

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public Date getFecha_lanzamiento() {
		return fecha_lanzamiento;
	}

	public void setFecha_lanzamiento(Date fecha_lanzamiento) {
		this.fecha_lanzamiento = fecha_lanzamiento;
	}

	public List<Plataforma> getPlataformas() {
		return plataformas;
	}

	public void setPlataformas(List<Plataforma> plataformas) {
		this.plataformas = plataformas;
	}

	public Boolean getMultijugador() {
		return multijugador;
	}

	public void setMultijugador(Boolean multijugador) {
		this.multijugador = multijugador;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	@Override
	public int hashCode() {
		return Objects.hash(fecha_lanzamiento, foto, genero, id, multijugador, nombre, plataformas);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Juego other = (Juego) obj;
		return Objects.equals(fecha_lanzamiento, other.fecha_lanzamiento) && Objects.equals(foto, other.foto)
				&& Objects.equals(genero, other.genero) && Objects.equals(id, other.id)
				&& Objects.equals(multijugador, other.multijugador) && Objects.equals(nombre, other.nombre)
				&& Objects.equals(plataformas, other.plataformas);
	}

	@Override
	public String toString() {
		return "Juego [id=" + id + ", nombre=" + nombre + ", genero=" + genero + ", fecha_lanzamiento="
				+ fecha_lanzamiento + ", multijugador=" + multijugador + ", foto=" + foto + ", plataformas="
				+ plataformas + "]";
	}


    
    
}
