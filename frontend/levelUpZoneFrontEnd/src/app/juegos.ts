import { Plataforma } from './plataformas';

export interface Juego {
  id: number;
  nombre: string;
  genero: string;
  fecha_lanzamiento: Date;
  plataformas: Plataforma[];
  multijugador: boolean;
  foto: string;
}
