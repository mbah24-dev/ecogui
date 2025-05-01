import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { LoginDto } from '../../../buyer/dto/user/login.dto';
import { SigninService } from '../../../buyer/services/auth/signin.service';
import { LoginResponseDto } from '../../../buyer/models/user/login-response.model';
import { AuthService } from '../../../buyer/services/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, MatButton, MatProgressSpinnerModule,  MatIconButton, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    authForm: FormGroup;
    errorMessage!: string;
    hide = true; // Password Hide
    exempleEmail: string = 'nom@ex.com';
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private signinService: SigninService,
        private authService: AuthService
    ) {
        this.authForm = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                ]
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                ]
            ],
        });
    }

    onSubmit() {
        if (this.authForm.valid) {
            this.isLoading = true;
            const loginData: LoginDto = this.authForm.value;
            this.signinService.signin(loginData).subscribe({
                next: (response: LoginResponseDto) => {
                  console.log("Réponse de l'API NestJS: ", response);
                  this.authService.login();
                  this.router.navigate(['/']);
                },
                error: (error) => {
                    this.isLoading = false;
                    if (error?.status === 401) {
                        this.errorMessage = "Email ou mot de passe incorrect.";
                      } else if (error?.status === 0) {
                        // Erreur réseau, probablement serveur down
                        this.errorMessage = "Impossible de se connecter au serveur. Veuillez réessayer plus tard.";
                      } else {
                        // Autres erreurs inconnues
                        this.errorMessage = "Une erreur est survenue. Merci de réessayer.";
                      }
                },
                complete: () => {
                    this.isLoading = false;
                }
            });
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

}
