import { Order } from '../model/order';
import { OrdersService } from './../services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent  implements OnInit{
  orders:Order[]=[];
  page = 0;
  pageSize = 8; // Nombre d'éléments par page
  totalItems = 0;
  paginatedOrders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  selectedStatus: string = '';
  orderStatuses: string[] = ['CREATED', 'SHIPPED', 'DELIVERED', 'CANCELED'];

  constructor(private ordersService:OrdersService){

  }

  ngOnInit(): void {
    this.getAllOrders();
    this.loadOrdersWithPagination();
    
  }
  getAllOrders(): void {
    this.ordersService.getAllOrders().subscribe(data => {
      this.orders = data;
      console.log('Categories loaded:', this.orders);
    })
  }
  loadOrdersWithPagination() {
    this.ordersService.getAllOrders().subscribe(data => {
      this.orders = data;
  
      //this.loadOrdersWithPagination();
      console.log("orders loaded ", this.orders);
      this.updatePaginatedOrders();
    });
  }
  
  onPageChange(): void {
    // Réagir au changement de page
    this.updatePaginatedOrders();
  }
  
  updatePaginatedOrders(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(startIndex, endIndex);
  }
  
  goToPage(page: number, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedOrders();
  }
  
  get totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }
  
  getPaginationArray(): number[] {
    const totalPages = this.totalPages;
    const paginationArray = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  }
  updateOrderStatus(orderId: string) {
    const orderToUpdate = this.orders.find(order => order.order.id === orderId);
    if (orderToUpdate) {
        console.log('New status for order', orderId, ':', orderToUpdate.order.status);
        this.ordersService.updateOrderStatus(orderId, orderToUpdate.order.status)
            .subscribe(updatedOrder => {
                console.log('Order status updated successfully:', updatedOrder);
                const index = this.orders.findIndex(order => order.order.id === updatedOrder.order.id);
                if (index !== -1) {
                    this.orders[index] = updatedOrder;
                    this.updatePaginatedOrders(); // Update the paginated orders array
                    // Refresh data from the server
                    this.getAllOrders();
                    this.loadOrdersWithPagination();
                }
            }, error => {
                console.error('Error updating order status:', error);
                // Handle error if needed
            });
    }
}

  
}
