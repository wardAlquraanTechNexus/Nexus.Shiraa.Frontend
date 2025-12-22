import { Component } from '@angular/core';

export interface Product {
  name: string;
  category: string;
  sales: number;
  revenue: string;
  trend: number;
}

@Component({
  selector: 'app-dashboard-component',
  standalone: false,
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent {
  
  displayedColumns: string[] = ['product', 'sales', 'revenue', 'trend', 'actions'];

  topProducts: Product[] = [
    {
      name: 'Product A',
      category: 'Category 1',
      sales: 456,
      revenue: '$12,340',
      trend: 12
    },
    {
      name: 'Product B',
      category: 'Category 2',
      sales: 389,
      revenue: '$9,870',
      trend: 8
    },
    {
      name: 'Product C',
      category: 'Category 1',
      sales: 312,
      revenue: '$7,650',
      trend: -3
    },
    {
      name: 'Product D',
      category: 'Category 3',
      sales: 267,
      revenue: '$5,340',
      trend: 15
    }
  ];
}
