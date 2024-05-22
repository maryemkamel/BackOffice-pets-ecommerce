import { OrdersService } from './../services/orders.service';

import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { User } from '../model/user';
import { UsersService } from './../services/users.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/product';
import { Order } from '../model/order';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private usersService: UsersService , private ordersService:OrdersService,private productsService:ProductsService) { }
  showCard: boolean = true;
  totalUsers: number = 0;
  totalOrders: number = 0;
  totalProducts: number = 0;
  users:User[]=[];
  products:Product[]=[];
  orders:Order[]=[];



  ngOnInit(): void { 
    this.getAllUsers();
    this.getAllOrders();
    this.getAllProducts();


  }
  getAllUsers(): void {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
      this.calculateTotals();

      console.log('Users fetched:', this.users); // Debug log
    });
  }
  getAllProducts(): void {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      this.calculateTotals();

      console.log('Products loaded:', this.products);
    });
  }
  getAllOrders(): void {
    this.ordersService.getAllOrders().subscribe(data => {
      this.orders = data;
      this.calculateTotals();

      console.log('Categories loaded:', this.orders);
    })
  }
  calculateTotals(): void {
    this.totalUsers = this.users.length;
    console.log("total users is :",this.totalUsers);
    this.totalOrders = this.orders.length;
    this.totalProducts = this.products.length;
    //this.totalSales = this.orders.reduce((acc, order) => acc + order.amount, 0);
  }

}
