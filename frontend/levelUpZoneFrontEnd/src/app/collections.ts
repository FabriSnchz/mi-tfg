import { Game } from "./games";

export interface Collection {
  id?: number;
  name: string;
  user_id: number;
  games?: Game[];
  // gameIds: number[]; // IDs de los juegos en la colección
}
