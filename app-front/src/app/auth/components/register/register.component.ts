import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { RoleService } from '../../../role.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, NgIf, ReactiveFormsModule, NgStyle],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  submitted: boolean = false;
  componentTitle: string = "Bconnect Shop";
  role: 'buyer' | 'seller' | 'admin' = 'buyer';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.role = this.roleService.getRole();
    console.log({ role: this.role });

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/) // ✅ Regex mise à jour
      ]],
      c_password: ['', [Validators.required]],
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,}(?: [a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,})+$/)
      ]]
    });

    this.addValidationListeners(); // ✅ Ajout des écouteurs d'événements
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.valid && this.passwordsMatch()) {
      this.signup(this.role, this.signupForm.value);
    } else {
      this.showValidate(document.querySelector<HTMLInputElement>('input[name="c_password"]')!);
    }
  }

  private passwordsMatch(): boolean {
    const password = this.signupForm.controls['password'].value;
    const confirmPassword = this.signupForm.controls['c_password'].value;
    return password === confirmPassword;
  }

  signup(role: 'buyer' | 'seller' | 'admin', userData: { email: string, password: string, name: string }) {
    this.authService.signup(role, userData).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.roleService.setRole(this.role);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = 'Inscription échouée. Vérifiez vos infos.';
      }
    });
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

    if (input.name === 'email') {
      const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
      return emailRegex.test(value);
    }

    if (input.name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordRegex.test(value);
    }

    if (input.name === 'c_password') {
      return this.passwordsMatch();
    }

    if (input.name === 'name') {
      const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,}(?: [a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,})+$/;
      return nameRegex.test(value);
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
