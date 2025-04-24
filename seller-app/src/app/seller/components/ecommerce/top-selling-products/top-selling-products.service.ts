import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TopSellingProductsService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    async loadChart(): Promise<void> {
        if (this.isBrowser) {
            try {
                // Importation dynamique de ApexCharts
                const ApexCharts = (await import('apexcharts')).default;

                // Définir les options du graphique
                const options = {
                    series: [
                        {
                            name: "Revenus",
                            data: [180, 2150000, 4000000, 3995000, 5225000] // Exemples en GNF
                        }
                    ],
                    chart: {
                        type: "area",
                        height: 292,
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    colors: [
                        "#3761EE"
                    ],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "straight",
                        width: [3]
                    },
                    markers: {
                        size: 5,
                        strokeWidth: 0,
                        hover: {
                            sizeOffset: 2
                        }
                    },
                    grid: {
                        show: false,
                        strokeDashArray: 1,
                        borderColor: "#edeff5"
                    },
                    xaxis: {
                        axisBorder: {
                            show: false,
                            color: '#edeff5'
                        },
                        axisTicks: {
                            show: false,
                            color: '#edeff5'
                        },
                        labels: {
                            show: false,
                            style: {
                                colors: "#262626",
                                fontSize: "13px"
                            }
                        },
                        categories: [
                            "Janv", "Févr", "Mars", "Avr", "Mai"
                        ]
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            style: {
                                colors: "#262626",
                                fontSize: "13px"
                            }
                        },
                        axisBorder: {
                            show: false,
                            color: '#edeff5'
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: function(val:any) {
                                return val.toLocaleString('fr-GN') + " GNF";
                            }
                        }
                    }
                };

                // Initialiser et afficher le graphique
                const chart = new ApexCharts(document.querySelector('#ecommerce_top_selling_products_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Erreur lors du chargement de ApexCharts :', error);
            }
        }
    }

}
