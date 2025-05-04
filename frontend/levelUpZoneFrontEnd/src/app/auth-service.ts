import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth'; // Ajusta según tu backend

  constructor(private readonly http: HttpClient) {}

  login(credentials: { userName: string; password: string }): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(data: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, data);
  }

  saveToken(jwt: string, role: string, userName: string): void {
    localStorage.setItem('token', jwt);
    localStorage.setItem('role', role);
    localStorage.setItem('userName', userName);
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
    console.log('getUserName', localStorage.getItem('userName'));
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
