import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgStyle } from '@angular/common';
import { RoleService } from '../../../role.service';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, NgIf, ReactiveFormsModule, NgStyle],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit{
  signinForm!: FormGroup;
  submitted: boolean = false;
  componentTilte: string = "Bconnect Shop";
  role: 'buyer' | 'seller' | 'admin' = 'buyer';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router, private formsBuilder: FormBuilder,
    private route: ActivatedRoute, private roleService: RoleService) {}

  ngOnInit(): void {
    this.role = this.roleService.getRole();
    console.log({role: this.role});
    this.signinForm = this.formsBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.signinForm.value);
    if (this.signinForm.valid) {
      this.signin(this.role, this.signinForm.value);
    }
  }

  signin(role: 'buyer' | 'seller' | 'admin', data: {email: string, password: string}) {
    this.authService.signin(role, data).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.roleService.setRole(this.role);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = "Email ou Mot de passe incorrect";
      }
    });
  }

  nav_signup() {
    if (this.role)
      this.router.navigate(['/signup']);
  }

  nav_forgot_password() {
    if (this.role)
      this.router.navigate(['/forgot-password']);
  }
}
