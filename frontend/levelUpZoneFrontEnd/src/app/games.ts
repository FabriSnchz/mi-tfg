export interface Game {
  id: number;
  name: string;
  genre: string;
  release_date: Date;
  platforms: string[];
  multiplayer: boolean;
  photo: string;
  studio: string;
  languages: string[];
  review_score: number;
  tags: string[];
  price: number;
  age_rating: string;
  description: string;
}
