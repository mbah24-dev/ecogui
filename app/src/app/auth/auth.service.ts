import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Enviroment } from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private env: Enviroment) {}
    signin(role: 'buyer' | 'seller' | 'admin', credentials: any): Observable<any> {
      return this.http.post(`${this.env.apiUrl}/auth/signin/${role}`, credentials, { withCredentials: true }).pipe(
        tap((response: any) => {
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
        })
      );
    }

    signup(role: 'buyer' | 'seller' | 'admin', userData: any): Observable<any> {
      return (this.http.post(`${this.env.apiUrl}/auth/signup/${role}`, userData, { withCredentials: true })).pipe(
        tap((response: any) => {
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
        })
      );
    }

    logout(): Observable<any> {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Token manquant');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.env.apiUrl}/auth/logout`, {}, { headers, withCredentials: true }).pipe(
        tap(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        })
      );
    }

    get_users_info(): Observable<{user: any}> {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Token manquant');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // withCredentials a true permet d'envoyer les cookies de session
      return this.http.get<{user: any}>(`${this.env.apiUrl}/users/me/info`, { headers, withCredentials: true });
    }

    send_email(userData: { email: string }): Observable<{ message: string }> {
      return (this.http.post<{ message: string }>(`${this.env.apiUrl}/auth/send-email`, userData))
    }

    reset_password(password: string, token: string): Observable<{ message: string }> {
      return this.http.post<{ message: string }>(
        `${this.env.apiUrl}/auth/reset-password?token=${token}`,
        { password }
      );
    }


}
