
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:8084'; // Remplacez par l'URL correcte de votre API

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/allOrders`);
  }
 
  updateOrderStatus(orderId: string, newStatus: string): Observable<any> {
    const url = `http://localhost:8084/orders/${orderId}/status?newStatus=${newStatus}`;
    const data = {}; 
    return this.http.patch(url, data);
  }
}

