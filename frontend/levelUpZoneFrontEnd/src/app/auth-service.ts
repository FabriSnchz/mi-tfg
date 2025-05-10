import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { JwtResponse } from './jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth'; // Ajusta según tu backend

  constructor(private readonly http: HttpClient) {}

  // login(credentials: { userName: string; password: string }): Observable<JwtResponse> {
  //   return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials);
  // }

  login(credentials: { userName: string; password: string }): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        console.log('Login response:', response);  // Imprime todo el objeto
        if (response?.token) {
          this.saveToken(response.token, response.role, response.userName, response.userId); // Guarda el token como jwt
        } else {
          console.error('No JWT received in response', response);
        }
      })
    );
  }

  register(data: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, data);
  }

  saveToken(jwt: string, role: string, userName: string, userId: number): void {
    console.log('Saving token', jwt);  // Agrega un log aquí para verificar que el token se está guardando
    localStorage.setItem('token', jwt);
    localStorage.setItem('role', role);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', String(userId)); // Asegúrate de que el ID del usuario se guarde correctamente
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('role');
    }
    return null;
  }

  getUserName(): string | null {
    return localStorage.getItem('userName'); // o donde lo estés guardando
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();  // true si hay token, false si no
  }
}
