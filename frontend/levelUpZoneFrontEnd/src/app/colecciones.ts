import { Juego } from './juegos';

export interface Coleccion {
  id: number;
  nombre: string;
  id_usuario: number;

  juegos: Juego[];
}
