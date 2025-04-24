import { Component } from '@angular/core';
import { WebsiteOverviewComponent } from './website-overview/website-overview.component';
import { TopSellingProductsComponent } from './top-selling-products/top-selling-products.component';
import { SalesOverviewComponent } from './sales-overview/sales-overview.component';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';
import { EarningsReportsComponent } from './earnings-reports/earnings-reports.component';

@Component({
    selector: 'app-ecommerce',
    imports: [WebsiteOverviewComponent, TopSellingProductsComponent, SalesOverviewComponent, RecentOrdersComponent, EarningsReportsComponent],
    templateUrl: './ecommerce.component.html',
    styleUrl: './ecommerce.component.scss'
})
export class EcommerceComponent {}
