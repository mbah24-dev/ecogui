import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-action',
  imports: [MatCardModule, MatButton, RouterLink],
  templateUrl: './order-action.component.html',
  styleUrl: './order-action.component.scss'
})
export class OrderActionComponent {
    email: string = 'mamadoualioubah191@gmail.com';
}
