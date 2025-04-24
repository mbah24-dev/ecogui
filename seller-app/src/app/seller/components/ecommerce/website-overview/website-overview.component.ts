import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TodaysOrderComponent } from './todays-order/todays-order.component';
import { TodaysRevenueComponent } from './todays-revenue/todays-revenue.component';
import { AverageValueComponent } from './average-value/average-value.component';
import { AllSpendingComponent } from './all-spending/all-spending.component';
import { ExpectedEarningsComponent } from './expected-earnings/expected-earnings.component';
import { WeekReportComponent } from './week-report/week-report.component';

@Component({
    selector: 'app-website-overview',
    imports: [MatCardModule, TodaysOrderComponent, TodaysRevenueComponent, AverageValueComponent, AllSpendingComponent, ExpectedEarningsComponent, WeekReportComponent],
    templateUrl: './website-overview.component.html',
    styleUrl: './website-overview.component.scss'
})
export class WebsiteOverviewComponent {}