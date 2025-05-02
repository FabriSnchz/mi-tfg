import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth'; // Ajusta según tu backend

  constructor(private readonly http: HttpClient) {}

  login(credentials: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }


  register(data: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, data);
  }


  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
}
