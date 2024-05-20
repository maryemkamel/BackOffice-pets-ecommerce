import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

interface LoginResponse {
  accessToken:string;
  userRole: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials= {
    email:'',
    password:''
  };

  constructor(private authService: AuthService, private router:Router) {

  }

  /*onLogin():void{
    this.authService.login(this.credentials).subscribe({
      next : (response) => {
        console.log('Login successful', response)
        this.router.navigate(['/dashboard']).then(success=> {
          if(success){
            console.log('Navigation to dashboard successful!')
          } else {
            console.log('Navigation to dashboard failed!')
          }
        })
      },
      error:(error) => {
        console.error('Login failed', error)
        console.log('Login details', error.error)
      }

    });
  }*/

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Store the token in localStorage
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('userRole', response.userRole);

        this.router.navigate(['/dashboard']).then(success => {
          if (success) {
            console.log('Navigation to dashboard successful!');
          } else {
            console.log('Navigation to dashboard failed!');
          }
        });
      },
      error: (error) => {
        console.error('Login failed', error);
        console.log('Login details', error.error);
      }
    });
  }


}
