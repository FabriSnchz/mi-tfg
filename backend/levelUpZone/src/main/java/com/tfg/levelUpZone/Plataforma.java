package com.tfg.levelUpZone;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "plataformas")
public class Plataforma {

	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    @Column(name = "id_plataforma")
	    private Long id;
		private String nombre;
		
	    @ManyToMany
	    @JoinTable(
	        name = "juegos_plataformas",
	        joinColumns = @JoinColumn(name = "id_plataforma"),
	        inverseJoinColumns = @JoinColumn(name = "id_juego")
	    )
	    private List<Juego> juegos;
		
		public Plataforma(Long id, String nombre) {
			super();
			this.id = id;
			this.nombre = nombre;
		}
		
		public Plataforma() {

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

		@Override
		public int hashCode() {
			return Objects.hash(id, nombre);
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Plataforma other = (Plataforma) obj;
			return Objects.equals(id, other.id) && Objects.equals(nombre, other.nombre);
		}

		@Override
		public String toString() {
			return "Plataforma [id=" + id + ", nombre=" + nombre + "]";
		}
		
		
		
}
