import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'seller-home-to-sell',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule, RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss'
})
export class SellerHomeComponent {
}
