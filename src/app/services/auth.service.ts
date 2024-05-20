import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {Observable, tap} from "rxjs";
import {JwtUtilService} from "../auth/jwt-util.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private jwtUtil:JwtUtilService) {
  }

  /*login(credentials: { email: String, password: String }): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(tap(response => {
        console.log("Login response received:", response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      }));

  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }*/

  /*login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(tap(response => {
        console.log("Login response received:", response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          // Assuming 'userRole' is the field name in the response for the user's role
          if (response.userRole) {
            localStorage.setItem('userRole', response.userRole);
          } else {
            console.warn('userRole is missing in the login response');
          }
        }
      }));
  }*/

  /* This one was working and getting the token
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('Token:', response.token);
          const decodedToken = this.jwtUtil.decodeToken(response.token);
          console.log('Decoded Token:', decodedToken);

          // Extracting roles assuming the structure is as described
          //const roles = decodedToken.roles;
          const roles = this.extractRoles(decodedToken)
          let userRole;
          if (roles && roles.length > 0) {
            // Attempt to manually parse the string to extract the role
            const roleString = roles[0]; // "[RoleDTO(id=1, role=ADMIN)]"
            const match = /\brole=([A-Z]+)\b/.exec(roleString);
            userRole = match ? match[1] : undefined; // Extracts "ADMIN" from the string
          }

          console.log('User Role:', userRole); // Log the extracted role

          localStorage.setItem('token', response.token);
          if (userRole) {
            localStorage.setItem('userRole', userRole);
          }
        }
      })
    );
  }
*/
  /*login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('Token:', response.token);
          const decodedToken = this.jwtUtil.decodeToken(response.token);
          console.log('Decoded Token:', decodedToken);
          const roles = this.extractRoles(decodedToken);
          const userRole = roles.length > 0 ? roles[0] : undefined;
          console.log('User Role:', userRole); // Check what role is being logged
          localStorage.setItem('token', response.token);
          if (userRole) {
            localStorage.setItem('userRole', userRole);
          }
        }
      })
    );
  }*/
  /*// Assuming the roles are stored in an array inside the token
  private extractRoles(decodedToken: any): string[] {
    try {
      // Assuming roles are nested and stored as string "[RoleDTO(id=1, role=ADMIN)]"
      const rolesRaw = decodedToken.roles; // This should log something like "[[RoleDTO(id=1, role=ADMIN)]]"
      if (rolesRaw && rolesRaw.length > 0) {
        const roleString = rolesRaw[0]; // This might be something like "[RoleDTO(id=1, role=ADMIN)]"
        const match = roleString.match(/role=([A-Z]+)/);
        if (match && match.length > 1) {
          return [match[1]]; // Returns ["ADMIN"]
        }
      }
    } catch (error) {
      console.error('Error extracting roles:', error);
    }
    return [];
  }
*/
/*
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('Token:', response.token);
          const decodedToken = this.jwtUtil.decodeToken(response.token);
          console.log('Decoded Token:', decodedToken);

          // Extracting roles assuming the structure is as described
          const roles = this.extractRoles(decodedToken); // Updated line
          let userRole;
          if (roles && roles.length > 0) {
            userRole = roles[0]; // Updated line: Extracts "ADMIN" from the string
          }

          console.log('User Role:', userRole); // Log the extracted role

          localStorage.setItem('token', response.token);
          if (userRole) {
            localStorage.setItem('userRole', userRole);
          }
        }
      })
    );
  }

  private extractRoles(decodedToken: any): string[] {
    try {
      // Assuming roles are stored as a string like "[RoleDTO(id=1, role=ADMIN)]"
      const rolesRaw = decodedToken.roles; // Updated line: This should log something like "[[RoleDTO(id=1, role=ADMIN)]]"
      if (rolesRaw && rolesRaw.length > 0) {
        const roleString = rolesRaw[0]; // Updated line: This might be something like "[RoleDTO(id=1, role=ADMIN)]"
        const match = roleString.match(/role=([A-Z]+)/); // Updated line: Extracts role using regex
        if (match && match.length > 1) {
          return [match[1]]; // Updated line: Returns ["ADMIN"]
        }
      }
    } catch (error) {
      console.error('Error extracting roles:', error);
    }
    return [];
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole'); // Ensure user role is also cleared on logout
  }*/

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('Token:', response.token);
          const decodedToken = this.jwtUtil.decodeToken(response.token);
          console.log('Decoded Token:', decodedToken);

          localStorage.setItem('token', response.token);

          console.log('Stored Token:', localStorage.getItem('token'));
        }
      })
    );
  }

  private extractRoles(decodedToken: any): string[] {
    try {
      const rolesRaw = decodedToken.roles;
      console.log('Roles raw:', rolesRaw);
      if (rolesRaw) {
        return rolesRaw.split(','); // Split roles by comma and return as array
      }
    } catch (error) {
      console.error('Error extracting roles:', error);
    }
    return [];
  }

/*
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('Token:', response.token);
          const decodedToken = this.jwtUtil.decodeToken(response.token);
          console.log('Decoded Token:', decodedToken);

          // Extracting roles assuming the structure is as described
          const roles = this.extractRoles(decodedToken);
          let userRole;
          if (roles && roles.length > 0) {
            userRole = roles[0]; // Extract the first role
          }

          console.log('User Role:', userRole); // Log the extracted role

          localStorage.setItem('token', response.token);
          if (userRole) {
            localStorage.setItem('userRole', userRole);
          }
        }
      })
    );
  }

  private extractRoles(decodedToken: any): string[] {
    try {
      const rolesRaw = decodedToken.roles;
      console.log('Roles raw:', rolesRaw);
      if (rolesRaw) {
        return rolesRaw.split(','); // Split roles by comma and return as array
      }
    } catch (error) {
      console.error('Error extracting roles:', error);
    }
    return [];
  }*/

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Optionally add a method to retrieve the user role
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

}
