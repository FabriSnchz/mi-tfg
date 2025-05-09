export interface JwtResponse {
  token: string;
  role: string;
  userName: string;
  userId: number; // Asegúrate de que el backend envíe el ID del usuario
}
