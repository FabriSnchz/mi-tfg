import { Platform } from './platforms';

export interface Game {
  id: number;
  name: string;
  genre: string;
  release_date: Date;
  platforms: Platform[];
  multiplayer: boolean;
  photo: string;
}
