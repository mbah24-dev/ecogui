import { Component } from '@angular/core';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';

@Component({
  selector: 'app-footer',
  imports: [FeathericonsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    public currentYear = new Date().getFullYear();
}
