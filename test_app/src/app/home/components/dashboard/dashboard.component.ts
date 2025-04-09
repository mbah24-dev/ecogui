import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../types/app.types';
import { NgIf } from '@angular/common';
import { RoleService } from '../../../role.service';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService) {}
  usersConnected?: User;
  errorMessage: string = '';
  role: 'buyer' | 'seller' | 'admin' = 'buyer'

  ngOnInit(): void {
      this.role = this.roleService.getRole();
      console.log({role: this.role});
      this.get_users_info();
  }

  logout() {
    this.authService.logout().subscribe(() => {
        console.log("Déconnexion réussie");
        this.usersConnected = undefined;
        this.roleService.setRole(this.role);
        this.router.navigate(['/signin']);
    })
  }

  get_users_info() {
    this.authService.get_users_info().subscribe({
      next: response => {
        this.usersConnected = response.user;
      },
      error: error => {
        console.error('Erreur lors de la récupération des infos utilisateur', error);
        this.errorMessage = 'Erreur lors de la récupération de vos informations. Veuillez vous reconnecter.';
      }
    });
  }
}
