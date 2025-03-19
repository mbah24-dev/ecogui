import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
    componentTilte: string = "Bconnect Shop";
    userData = {
      email: '',
      password: '',
      name: ''
    };
    role: 'buyer' | 'seller' = 'buyer';
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) {}
    signup() {
      console.log(this.userData);
      this.authService.signup(this.role, this.userData).subscribe(
        {
          next: response => {
            console.log("Inscription réussie", response);
            this.router.navigate(['/dashboard']);
          },
          error: error => {
            console.log("Erreur d\'inscription", error);
            this.errorMessage = 'Échec de l\'inscription. Veuillez réessayer.';
          }
        }
      );
    }
}
