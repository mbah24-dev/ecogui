import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

@Component({
  selector: 'app-change-password',
  imports: [MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
    hide = true;
    hide2 = true;
    hide3 = true;
}
