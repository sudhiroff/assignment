import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2022', '2023', '2024'],
    datasets: [
      { data: [24651, 23344, 23550], label: 'Visa' },
      { data: [11258, 11885, 12315], label: 'MasterCard' },
      { data: [921, 591, 765], label: 'Discover' },
      { data: [28907, 31255, 32182], label: 'PayPal' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  // line chart data start  //

  lineLabels = ['2022', '2023', '2024'];

  lineChartDataByType = [
    {
      type: "VISA",
      lineChartData: {
        labels: [...this.lineLabels],
        datasets: [
          {
            data: [24651, 23344, 23550],
            label: 'VISA',
            tension: 0.5,
          }
        ]
      }
    },
    {
      type: "MasterCard",
      lineChartData: {
        labels: [...this.lineLabels],
        datasets: [
          {
            data: [11258, 11885, 12315],
            label: 'MasterCard',
            tension: 0.5,
          }
        ]
      }
    },
    {
      type: "PayPal",
      lineChartData: {
        labels: [...this.lineLabels],
        datasets: [
          {
            data: [28907, 31255, 32182],
            label: 'PayPal',
            tension: 0.5,
          }
        ]
      }
    },
    {
      type: "Discover",
      lineChartData: {
        labels: [...this.lineLabels],
        datasets: [
          {
            data: [921, 591, 765],
            label: 'Discover',
            tension: 0.5,
          }
        ]
      }
    },
  ]


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [...this.lineLabels],
    datasets: [
      {
        data: [24651, 23344, 23550],
        label: 'VISA',
        tension: 0.5,
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  selectedLineChartType = "VISA";
  public change(event: any) {
    this.selectedLineChartType = event.target.value;
  }



  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Visa'], ['MasterCard'], ['Discover'], ['PayPal']];
  public pieChartDatasets = [
    {
      data: [24651, 11258, 921, 28907]
    }
  ];
  yearWiseDataSetPieCHart = [
    {
      year: "2022",
      salesData: [{ data: [24651, 11258, 921, 28907] }]
    },
    {
      year: "2023",
      salesData: [{ data: [23344, 11885, 591, 31255] }]
    },
    {
      year: "2024",
      salesData: [{ data: [23550, 12315, 765, 32182] }]
    }
  ]

  public pieChartLegend = true;
  public pieChartPlugins = [];
}
