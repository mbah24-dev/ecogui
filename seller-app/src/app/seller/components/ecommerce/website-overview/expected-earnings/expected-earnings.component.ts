import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-expected-earnings',
    imports: [MatProgressBarModule],
    templateUrl: './expected-earnings.component.html',
    styleUrl: './expected-earnings.component.scss'
})
export class ExpectedEarningsComponent {}