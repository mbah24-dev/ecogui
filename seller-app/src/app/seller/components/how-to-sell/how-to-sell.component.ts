import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-how-to-sell',
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './how-to-sell.component.html',
  styleUrl: './how-to-sell.component.scss'
})
export class HowToSellComponent {

}
