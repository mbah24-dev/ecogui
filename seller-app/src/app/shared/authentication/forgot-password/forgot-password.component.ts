import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { UserService } from '../../../seller/services/user/user.service';
import { CommonModule } from '@angular/common';
import { SendEmailDto } from '../../../seller/dto/user/sendemail.dto';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-forgot-password',
    imports: [RouterLink, MatProgressSpinnerModule,  MatFormFieldModule, CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FeathericonsModule],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
    formInfo!: FormGroup;
    errorMessage!: string;
    exempleEmail: string = 'nom@exple.com';
    isLoading: boolean = false;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
        this.formInfo = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                ]
            ],
        });
    }

    sendmail() {
        if (this.formInfo.valid) {
          this.isLoading = true; // Active le spinner
          const email: SendEmailDto = this.formInfo.value;
          this.userService.userSendMail(email).subscribe({
            next: (response) => {
              this.router.navigate(['/authentication/confirm-email']);
            },
            error: (err) => {
              this.errorMessage = err.error?.message || 'Aucun utilisateur associé à cet email';
              this.isLoading = false;
            },
            complete: () => {
              this.isLoading = false; // Désactive le spinner après l'appel
            }
          });
        }
    }
}
