import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../../role.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})

export class ResetPassword implements OnInit {
  resetPasswordForm!: FormGroup;
  submitted: boolean = false;
  componentTitle: string = "Bconnect Shop";
  role: 'buyer' | 'seller' | 'admin' = 'buyer';
  errorMessage: string = '';
  isValid: boolean = false;
  token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.role = this.roleService.getRole();
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.errorMessage = "Token invalide ou expiré.";
    }
    console.log({ role: this.role });

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/) // ✅ Regex mise à jour
      ]],
      c_password: ['', [Validators.required]],
    });

    this.addValidationListeners();
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetPasswordForm.valid && this.passwordsMatch()) {
      const password = this.resetPasswordForm.value.password;
      this.reset_password(password);
    } else {
      this.showValidate(document.querySelector<HTMLInputElement>('input[name="c_password"]')!);
    }
  }

  reset_password(password: string) {
    if (!this.token) return;
    this.authService.reset_password(password, this.token).subscribe({
      next: (response) => {
        this.errorMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 3000);
        this.isValid = true;
      },
      error: (err) => {
        this.isValid = false;
        this.errorMessage = err.error?.message || "Erreur lors de la réinitialisation.";
      }
    })
  }

  private passwordsMatch(): boolean {
    const password = this.resetPasswordForm.controls['password'].value;
    const confirmPassword = this.resetPasswordForm.controls['c_password'].value;
    return password === confirmPassword;
  }

  nav_signin() {
    this.router.navigate(['/signin']);
  }

  /** ✅ Ajout des fonctions de validation et de gestion des erreurs */
  private addValidationListeners(): void {
    if (typeof document === 'undefined') {
      return; // Empêche l'exécution côté serveur (SSR)
    }

    const inputs = document.querySelectorAll<HTMLInputElement>('.validate-input .input100');

    inputs.forEach(input => {
      input.addEventListener('focus', () => this.hideValidate(input));
    });

    const form = document.querySelector<HTMLFormElement>('.validate-form');
    if (form) {
      form.addEventListener('submit', (event) => {
        let isValid = true;
        inputs.forEach(input => {
          if (!this.validate(input)) {
            this.showValidate(input);
            isValid = false;
          }
        });

        if (!this.passwordsMatch()) {
          const cPasswordInput = document.querySelector<HTMLInputElement>('input[name="c_password"]');
          if (cPasswordInput) {
            this.showValidate(cPasswordInput);
          }
          isValid = false;
        }

        if (!isValid) {
          event.preventDefault(); // Empêche l'envoi du formulaire si invalide
        }
      });
    }
  }

  private validate(input: HTMLInputElement): boolean {
    const value = input.value.trim();

    if (input.name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordRegex.test(value);
    }

    if (input.name === 'c_password') {
      return this.passwordsMatch();
    }

    return value !== '';
  }

  private showValidate(input: HTMLInputElement): void {
    const parent = input.parentElement;
    if (parent) {
      parent.classList.add('alert-validate');
    }
  }

  private hideValidate(input: HTMLInputElement): void {
    const parent = input.parentElement;
    if (parent) {
      parent.classList.remove('alert-validate');
    }
  }
}

