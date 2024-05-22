
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { User } from '../model/user';
import {environment} from "../../environment/environment";



@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:8084'; 
  private apiUrlUser = environment.apiUrl;


  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/allOrders`);
  }
 
  updateOrderStatus(orderId: string, newStatus: string): Observable<any> {
    const url = `http://localhost:8084/orders/${orderId}/status?newStatus=${newStatus}`;
    const data = {}; 
    return this.http.patch(url, data);
  }
  
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUser + "/users/");
  }


}

