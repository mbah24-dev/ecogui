import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-e-sellers',
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './seller-overview.component.html',
    styleUrl: './seller-overview.component.scss'
})
export class SellerOverviewComponent {}
