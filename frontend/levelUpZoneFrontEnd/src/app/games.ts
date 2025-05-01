import { Plataforma } from './plataformas';

export interface Game {
  id: number;
  nombre: string;
  genero: string;
  fecha_lanzamiento: Date;
  plataformas: Plataforma[];
  multijugador: boolean;
  foto: string;
}
