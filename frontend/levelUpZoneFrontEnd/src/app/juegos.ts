export interface Juego {
  id: number;
  nombre: string;
  genero: string;
  fecha_lanzamiento: Date;
  plataformas: string[];
  multijugador: boolean;
  foto: string;
}
