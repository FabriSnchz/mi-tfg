
export interface Collection {
  id?: number;
  name: string;
  user_id: number;
  gameIds: number[]; // IDs de los juegos en la colección
}
