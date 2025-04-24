import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-billing-information',
  imports: [MatCardModule],
  templateUrl: './billing-information.component.html',
  styleUrl: './billing-information.component.scss'
})
export class BillingInformationComponent {
    email: string = 'mamadoualioubah191@gmail.com';
}
