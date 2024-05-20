import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import {environment} from "../../environment/environment";

//const apiUrl = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "/users/");
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/admin/${user.userId}`, user);
  }



  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl + "/users/register", user);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(this.apiUrl + "/users/" + userId);
  }


  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/admin/${userId}`);
  }

  updateUserStatus(userId: number, status: string): Observable<User> {
    const endpoint = status === 'ACTIVE' ? 'activate' : 'deactivate';
    return this.http.put<User>(`${this.apiUrl}/users/admin/${userId}/${endpoint}`, {});
  }


}
