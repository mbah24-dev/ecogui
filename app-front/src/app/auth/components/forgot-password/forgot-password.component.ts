import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { RoleService } from '../../../role.service';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
  email: string = '';
  users: any[] = [];  // Stocke les utilisateurs
  errorMessage: string = '';  // Stocke l'erreur
  role: 'buyer' | 'seller' | 'admin' = 'buyer';

  constructor(
    private readonly authService: AuthService,
    private roleService: RoleService,
    private router: Router) {}

  ngOnInit(): void {
      this.role = this.roleService.getRole();
      console.log({role: this.role});
  }

  requestReset() {
    console.log('Demande de réinitialisation pour', this.email);
    // Implémente l'appel API plus tard
  }

  nav_signin() {
    if (this.role)
      this.router.navigate(['/signin']);
  }

}
