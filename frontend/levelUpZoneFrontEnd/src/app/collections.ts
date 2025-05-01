import { Game } from './games';

export interface Collection {
  id: number;
  nombre: string;
  id_usuario: number;

  Games: Game[];
}
