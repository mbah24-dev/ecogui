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
    features = [
        {
          icon: 'storefront',
          title: 'Votre boutique en ligne',
          desc: 'Créez votre vitrine en quelques clics et commencez à vendre immédiatement.',
        },
        {
          icon: 'credit_score',
          title: 'Paiements sécurisés',
          desc: 'Recevez vos paiements rapidement avec notre système sécurisé.',
        },
        {
          icon: 'emoji_events',
          title: 'Visibilité nationale',
          desc: 'Touchez des milliers de clients dans tout le pays.',
        },
        {
          icon: 'support_agent',
          title: 'Support local',
          desc: 'Notre équipe vous accompagne à chaque étape.',
        }
      ];

}
