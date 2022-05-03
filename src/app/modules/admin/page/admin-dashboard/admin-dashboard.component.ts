import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor() {}
  basicData: any;
  basicOptions = {
    responsive: false,
    maintainAspectRatio: false,
  };
  data: any;
  chartOptions = {
    responsive: false,
  };
  ngOnInit(): void {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Total Income',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Total Expences',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
    this.data = {
      labels: [
        'Total Income',
        'Total Expences',
        'Cash on Hand',
        'Net Profit Margin',
      ],
      datasets: [
        {
          data: [579000, 79000, 92000, 179000],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#9C7B82'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#9C7B82'],
        },
      ],
    };
  }
}
