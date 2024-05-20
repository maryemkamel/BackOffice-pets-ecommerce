import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;
  logoName: string = "DriveDash"; 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
