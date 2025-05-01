import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { SignupService } from '../../../buyer/services/auth/signup.service';
import { LoginDto } from '../../../buyer/dto/user/login.dto';
import { LoginResponseDto } from '../../../buyer/models/user/login-response.model';
import { AuthService } from '../../../buyer/services/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-sign-up',
    imports: [RouterLink, MatButton, MatProgressSpinnerModule,  MatIconButton, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    errorMessage!: string;
    hide = true; // Password Hide
    authForm: FormGroup;
    exempleEmail: string = 'nom@ex.com';
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private signupService: SignupService,
        private authService: AuthService
    ) {
        this.authForm = this.fb.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,}(?: [a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,})+$/)
                ]
            ],
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
            termsAccepted: [false, Validators.requiredTrue]
        });
    }

    onSubmit() {
        if (this.authForm.valid) {
            this.isLoading = true;
            const registrationData: LoginDto = this.authForm.value;
            this.signupService.signup(registrationData).subscribe({
                next: (response: LoginResponseDto) => {
                    console.log("Réponse de l'API NestJS: ", response);
                    this.authService.login();
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.isLoading = false;
                    if (error?.status === 409) {
                        this.errorMessage = "Un compte avec cet email existe déjà.";
                    } else if (error?.status === 0) {
                        this.errorMessage = "Impossible de se connecter au serveur. Veuillez réessayer plus tard.";
                    } else {
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
