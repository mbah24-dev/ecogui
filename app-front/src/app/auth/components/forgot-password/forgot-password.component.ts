import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = '';
  users: any[] = [];  // Stocke les utilisateurs
  errorMessage: string = '';  // Stocke l'erreur

  constructor(private readonly authService: AuthService) {}

  requestReset() {
    console.log('Demande de réinitialisation pour', this.email);
    // Implémente l'appel API plus tard
  }


}
