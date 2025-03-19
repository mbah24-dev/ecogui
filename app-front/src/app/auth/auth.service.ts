import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl: string = "http://localhost:3000/auth";
  router: any;

    constructor(private http: HttpClient) {}
    signin(role: 'buyer' | 'seller' | 'admin', credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/signin/${role}`, credentials).pipe(
        tap((response: any) => {
          if (response.accessToken) {
            // Stocke le token JWT dans le localStorage
            localStorage.setItem('auth_token', response.accessToken);
            // Stocke aussi l'utilisateur
            localStorage.setItem('user', JSON.stringify(response.user));
          }
        })
      );
    }

    signup(role: 'buyer' | 'seller', userData: any): Observable<any> {
      return (this.http.post(`${this.apiUrl}/signup/${role}`, userData));
    }

    logout(): Observable<any> {
      return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
        tap(() => {
          // Supprime le token du localStorage pour déconnecter l'utilisateur
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          this.router.navigate(['/signin']);  // Redirige vers la page de connexion
        })
      );
    }

}
