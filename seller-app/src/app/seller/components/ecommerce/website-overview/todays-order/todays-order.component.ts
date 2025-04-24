import { Component } from '@angular/core';
import { TodaysOrderService } from './todays-order.service';

@Component({
    selector: 'app-todays-order',
    imports: [],
    templateUrl: './todays-order.component.html',
    styleUrl: './todays-order.component.scss'
})
export class TodaysOrderComponent {

    constructor(
        private todaysOrderService: TodaysOrderService
    ) {}

    ngOnInit(): void {
        this.todaysOrderService.loadChart();
    }

}