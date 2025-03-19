import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  componentTilte: string = "Bconnect Shop";
  credentials: {email: string, password: string} = {email: '', password: ''};
  role: 'buyer' | 'seller' | 'admin' = 'buyer';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router) {}
  signin() {
    console.log(this.credentials);
    this.authService.signin(this.role, this.credentials).subscribe(
      {
        next: response => {
          console.log("Connexion réussie", response);
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          console.error('Erreur de connexion', error);
          this.errorMessage = "Email ou Mot de passe incorrect";
        }
      }
    );
  }

}
