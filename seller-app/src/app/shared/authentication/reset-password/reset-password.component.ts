import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-reset-password',
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FeathericonsModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

    // Password Hide
    hide = true;
    hide2 = true;

}
