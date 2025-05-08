import { Component } from '@angular/core';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [FeathericonsModule, MatIconModule, MatFormFieldModule, MatSelectModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    currentYear: number = new Date().getFullYear();
    selectedLanguage: string = 'fr';
    public email: string = 'support@ecogui.com';

}
