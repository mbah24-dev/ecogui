import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../../role.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginForm') loginFormElement!: ElementRef<HTMLFormElement>; // Correction ici
  signinForm!: FormGroup;
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

    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngAfterViewInit(): void {
    // Exécuter le code uniquement après le rendu du composant
    this.addValidationListeners();
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid) {
      this.signin(this.role, this.signinForm.value);
    }
  }

  signin(role: 'buyer' | 'seller' | 'admin', data: { email: string, password: string }) {
    this.authService.signin(role, data).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.roleService.setRole(this.role);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = "Email ou Mot de passe incorrect";
      }
    });
  }

  nav_signup() {
    this.router.navigate(['/signup']);
  }

  nav_forgot_password() {
    this.router.navigate(['/forgot-password']);
  }

  /** ✅ Ajout des fonctions de validation et gestion des erreurs */
  private addValidationListeners(): void {
    if (!this.loginFormElement) return;

    const inputs = this.loginFormElement.nativeElement.querySelectorAll<HTMLInputElement>('.validate-input .input100');

    inputs.forEach(input => {
      input.addEventListener('focus', () => this.hideValidate(input));
    });

    this.loginFormElement.nativeElement.addEventListener('submit', (event: Event) => {
      let isValid = true;
      inputs.forEach(input => {
        if (!this.validate(input)) {
          this.showValidate(input);
          isValid = false;
        }
      });

      if (!isValid) {
        event.preventDefault(); // Empêche l'envoi du formulaire si invalide
      }
    });
  }

  private validate(input: HTMLInputElement): boolean {
    const value = input.value.trim();
    if (input.type === 'email' || input.name === 'email') {
      const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
      return emailRegex.test(value);
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

