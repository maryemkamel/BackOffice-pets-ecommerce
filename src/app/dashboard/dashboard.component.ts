import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UsersService } from './../services/users.service';
import { ProductsService } from '../services/products.service';
import { OrdersService } from './../services/orders.service';
import { Product } from '../model/product';
import { Order } from '../model/order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private usersService: UsersService, private ordersService: OrdersService, private productsService: ProductsService) { }
  showCard: boolean = true;
  totalUsers: number = 0;
  totalOrders: number = 0;
  totalProducts: number = 0;
  displayedUsers: number = 0;
  displayedOrders: number = 0;
  displayedProducts: number = 0;
  users: User[] = [];
  products: Product[] = [];
  orders: Order[] = [];

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllOrders();
    this.getAllProducts();
  }

  getAllUsers(): void {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
      this.calculateTotals();
      this.incrementCounter('users'); // Start counter for users
      console.log('Users fetched:', this.users);
    });
  }

  getAllProducts(): void {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      this.calculateTotals();
      this.incrementCounter('products'); // Start counter for products
      console.log('Products loaded:', this.products);
    });
  }

  getAllOrders(): void {
    this.ordersService.getAllOrders().subscribe(data => {
      this.orders = data;
      this.calculateTotals();
      this.incrementCounter('orders'); // Start counter for orders
      console.log('Orders loaded:', this.orders);
    });
  }

  calculateTotals(): void {
    this.totalUsers = this.users.length;
    this.totalOrders = this.orders.length;
    this.totalProducts = this.products.length;
    console.log("Total users is:", this.totalUsers);
    console.log("Total orders is:", this.totalOrders);
    console.log("Total products is:", this.totalProducts);
  }

  incrementCounter(type: string): void {
    let interval: number;
    switch (type) {
      case 'users':
        interval = window.setInterval(() => {
          if (this.displayedUsers < this.totalUsers) {
            this.displayedUsers++;
          } else {
            clearInterval(interval);
          }
        }, 100); // Adjust the speed here
        break;
      case 'orders':
        interval = window.setInterval(() => {
          if (this.displayedOrders < this.totalOrders) {
            this.displayedOrders++;
          } else {
            clearInterval(interval);
          }
        }, 100); // Adjust the speed here
        break;
      case 'products':
        interval = window.setInterval(() => {
          if (this.displayedProducts < this.totalProducts) {
            this.displayedProducts++;
          } else {
            clearInterval(interval);
          }
        }, 100); // Adjust the speed here
        break;
    }
  }
}
