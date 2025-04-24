import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TodaysOrderService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    async loadChart(): Promise<void> {
        if (this.isBrowser) {
            try {
                // Dynamically import ApexCharts
                const ApexCharts = (await import('apexcharts')).default;

                // Define chart options
                const options = {
                    series: [63],
                    chart: {
                        height: 87,
                        type: "radialBar"
                    },
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                size: "50%"
                            },
                            dataLabels: {
                                value: {
                                    offsetY: -11
                                }
                            },
                            track: {
                                background: '#eeeeee',
                            }
                        }
                    },
                    colors: [
                        "#3354f4"
                    ],
                    labels: [""]
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#ecommerce_todays_order_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}