export interface Order {
    user: User;
    order: OrderDetails;
  }
  
  export interface User {
    userId: number;
    firstname: string;
    lastname: string;
    email: string;
    numberPhone: string;
  }
  
  export interface OrderDetails {
    id: string;
    userId: number;
    deliveryAddress: DeliveryAddress;
    items: OrderItem[];
    date: Date;
    totalPrice: number;
    status: string;
    selectedStatus: string; // Nouvelle propriété
  }
  
  
  export interface DeliveryAddress {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    email: string;
    zipCode: string;
    phone: string;
    comment: string;
  }
  
  export interface OrderItem {
    productId: string;
    label: string;
    price: string;
    qty: number;
  }
  