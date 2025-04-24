import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';

@Component({
    selector: 'app-stats',
    imports: [MatCardModule, FeathericonsModule],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss'
})
export class StatsComponent {}
