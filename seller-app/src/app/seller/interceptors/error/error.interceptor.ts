import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; // Pour afficher les messages d'erreur

/**
 * L'`ErrorInterceptor` est un intercepteur HTTP qui intercepte les erreurs des requêtes sortantes.
 * Il détecte les erreurs HTTP de type 401 (Non autorisé) et 500 (Erreur serveur), et affiche un message d'erreur approprié.
 * L'intercepteur utilise `MatSnackBar` pour afficher ces messages d'erreur sous forme de notifications.
 *
 * @see HttpInterceptor
 * @see MatSnackBar
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * Le constructeur injecte le service `MatSnackBar` pour afficher des notifications à l'utilisateur.
   *
   * @param snackBar Le service pour afficher des notifications à l'utilisateur.
   */
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Méthode d'interception des requêtes HTTP sortantes pour attraper les erreurs et afficher des messages d'erreur
   * appropriés en cas d'erreur 401 ou 500.
   *
   * @param req La requête HTTP qui doit être interceptée.
   * @param next Le gestionnaire de la requête HTTP qui permet de transmettre la requête.
   * @returns Un observable contenant la réponse ou une erreur, en fonction du traitement effectué.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse && event.status >= 400) {
          throw new HttpErrorResponse({
            error: event.body,
            headers: event.headers,
            status: event.status,
            statusText: event.statusText,
            url: event.url || undefined
          });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('[ErrorInterceptor]', error);
        if (error.status === 401) {
          this.snackBar.open('Votre session a expiré. Veuillez vous reconnecter.', 'Fermer', { duration: 3000 });
        }
        else if (error.status === 500) {
          this.snackBar.open('Une erreur interne est survenue. Veuillez réessayer plus tard.', 'Fermer', { duration: 3000 });
        }
        else {
          this.snackBar.open('Une erreur inconnue est survenue.', 'Fermer', { duration: 3000 });
        }

        return throwError(() => error);
      })
    );
  }
}
