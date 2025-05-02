import { Game } from './games';

export interface Collection {
  id: number;
  name: string;
  id_usuario: number;

  Games: Game[];
}
