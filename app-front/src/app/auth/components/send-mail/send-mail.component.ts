import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../../../role.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './send-mail.component.html',
  styleUrl: './send-mail.component.scss'
})

export class SendMail implements OnInit {
  sendMailForm!: FormGroup;
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

    // Initialisation du formulaire avec les validations
    this.sendMailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // Ajout des écouteurs pour la validation en TypeScript
    this.addValidationListeners();
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.sendMailForm.value);
    if (this.sendMailForm.valid) {
      this.sendmail("");
    }
  }

  sendmail(email: string) {

  }

  nav_signup() {
    if (this.role)
      this.router.navigate(['/signup']);
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
        if (!isValid) {
          event.preventDefault(); // Empêche l'envoi du formulaire si invalide
        }
      });
    }
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

