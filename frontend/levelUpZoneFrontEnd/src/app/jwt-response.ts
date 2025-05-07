export interface JwtResponse {
  token: string;
  role: string;
  userName: string;
  id: number; // Asegúrate de que el backend envíe el ID del usuario
}
