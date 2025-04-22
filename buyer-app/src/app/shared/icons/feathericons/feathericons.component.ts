import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from './feathericons.module';

@Component({
    selector: 'app-feathericons',
    imports: [MatCardModule, MatButtonModule, FeathericonsModule],
    templateUrl: './feathericons.component.html',
    styleUrl: './feathericons.component.scss'
})
export class FeathericonsComponent {}