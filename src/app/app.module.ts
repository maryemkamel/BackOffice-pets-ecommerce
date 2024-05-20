import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import {TokenInterceptorService} from "./auth/token-interceptor.service";
import {ConfirmationDialogService} from "./commun/confirm-dialog/confirmation-dialog.service";
import { OrderDetailsComponent } from './order-details/order-details.component';




@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    DashboardComponent,
    UsersComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    ProductsComponent,
    OrdersComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    OrderDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true,

  },
  ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
