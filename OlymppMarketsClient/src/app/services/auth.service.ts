import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn()); 
  isLoggedIn$ = this.loggedIn.asObservable(); 

  constructor(private http: HttpClient) { }

  // Méthode de connexion
  login(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/authorization/login`, { username, password })
    .pipe(tap(response => {
      // Si la connexion réussit, stockez le token et mettez à jour l'état de connexion
      localStorage.setItem('token', response.token);
      this.loggedIn.next(true);
    }));
  }

  // Méthode de déconnexion
  logout(): void {
    localStorage.removeItem('token'); 
    this.loggedIn.next(false); 
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }
}