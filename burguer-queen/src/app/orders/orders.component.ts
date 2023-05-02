import { Component, Output } from '@angular/core';
import { ApiBQService } from '../services/api-bq.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  @Output() title:any = "Orders"

  ordersArray:any[] = []
  ordersProducts:any[] = []

  // Para cargar los productos desde la API
  constructor(private api: ApiBQService, private router: Router) {
    this.getOrdersArray();
  }

  getOrdersArray(){
    this.api.getOrders().subscribe({
      next: (data: any) => {
        this.ordersArray = data;

        data.map((order:any)=>{this.ordersProducts.push(order.products)})
        console.log(this.ordersArray);
        console.log(this.ordersProducts);


      }
    })
  }
}

