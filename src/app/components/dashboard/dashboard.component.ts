import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: number[] = [];
  basicData: any = {};
  basicOptions: any = {};
  mapRes: Map<string, number> = new Map<string, number>();
  salesData: number[] = [];
  labels: string[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getStats().subscribe(
      data => {
        if (data) {
          this.stats = data;
        }
      },
      error => {
        // Handle error here (e.g., display error message to user)
        console.error('Error fetching stats:', error);
      }
    );
  
    this.dashboardService.getTotalTransactionAmountByMonth().subscribe(
      data => {
        console.log("Our data:", data);
  
        if (data) {
          // Assuming data is an object where keys are month names and values are transaction amounts
          this.mapRes = new Map<string, number>(Object.entries(data));
  
          this.labels = Array.from(this.mapRes.keys());
          this.salesData = Array.from(this.mapRes.values());
  
          this.basicData = {
            labels: this.labels,
            datasets: [
              {
                label: 'Sales',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: this.salesData
              }
            ]
          };
        }
      },
      error => {
        // Handle error here (e.g., display error message to user)
        console.error('Error fetching transaction data:', error);
      }
    );
  
    this.basicOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Products'
          }
        },
        y: {
          display: true,
          title: {
            display: false,
            text: 'Sales'
          },
          ticks: {
            stepSize: 30
          }
        }
      }
    };
  }
}  