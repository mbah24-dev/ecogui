import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, RouterLink, NgIf, ReactiveFormsModule, NgStyle],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  signinForm!: FormGroup;
  submitted: boolean = false;
  componentTilte: string = "Bconnect Shop";
  role: 'buyer' | 'seller' | 'admin' = 'buyer';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router, private formsBuilder: FormBuilder) {
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
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = "Email ou Mot de passe incorrect";
      }
    });
  }
}
