import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-remixicon',
    imports: [MatCardModule, MatButtonModule],
    templateUrl: './remixicon.component.html',
    styleUrl: './remixicon.component.scss'
})
export class RemixiconComponent {}