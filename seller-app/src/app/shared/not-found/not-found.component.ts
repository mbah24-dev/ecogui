import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-not-found',
    imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
    ecogui_support_email: string = "support@ecogui.com";

    constructor(private location: Location) {}

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.location.go('/'); // Redirige vers l'accueil si pas d'historique
    }
  }
}
