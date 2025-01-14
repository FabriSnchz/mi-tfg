export interface Juego {
  id: number;
  name: string;
  genre: string;
  releaseDate: Date;
  photo: string;
  platform: string[];
  isMultiplayer: boolean;
}
