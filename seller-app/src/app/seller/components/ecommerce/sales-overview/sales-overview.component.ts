import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-sales-overview',
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTabsModule],
    templateUrl: './sales-overview.component.html',
    styleUrl: './sales-overview.component.scss'
})
export class SalesOverviewComponent {}