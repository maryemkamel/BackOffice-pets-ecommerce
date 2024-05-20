import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() {}

  /*intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole'); // Retrieve user role from localStorage

    // Create a flexible headers object
    const headers: Record<string, string> = {};

    // Conditionally add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;

    }

    // Conditionally add X-User-Role header if userRole exists
    if (userRole) {
      headers['X-User-Role'] = userRole;

    }
    console.log('Applying headers:', headers);
    console.log('User Role:', userRole);
    // Clone the request with the new headers
    request = request.clone({ setHeaders: headers });

    return next.handle(request);
  }*/

  /*intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userRole = localStorage.getItem('userRole');
    console.log("Current user role:", userRole);  // Verify if this logs 'ADMIN'

    if (userRole) {
      request = request.clone({
        setHeaders: {
          'X-User-Role': userRole
        }
      });
    }
    return next.handle(request);
  }*/

  /* Hands on nigga
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers;
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    // Log the token and userRole to ensure they are retrieved correctly
    console.log("Token:", token);
    console.log("User Role:", userRole);

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (userRole) {
      headers = headers.set('X-User-Role', userRole);
    }

    // Clone the request with potentially new headers
    const authReq = req.clone({ headers });

    // Log the final set of headers to verify them
    console.log('Headers being sent:', authReq.headers.keys());

    return next.handle(authReq);
  }*/

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let modifiedRequest = request;

    if (token) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(modifiedRequest);
  }


}
