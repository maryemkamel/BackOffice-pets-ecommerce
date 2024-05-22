import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string ='';
  products = [
    {
      name: 'Premium Dog Food',
      quantity: 1,
      price: 299,
      shortDescription: 'High-quality dog food for your beloved pet',
      image: 'https://assets.petco.com/petco/image/upload/f_auto,q_auto/3347860-center-1'
    },
    {
      name: 'Cat Toy',
      quantity: 2,
      price: 99,
      shortDescription: 'High-quality dog food for your beloved pet',
      image: 'https://th.bing.com/th/id/R.d0e0dc55b6479390ee24a6a987c78137?rik=WQ2lYLLyXSECKg&riu=http%3a%2f%2fs7d1.scene7.com%2fis%2fimage%2fPETCO%2f946184-center-1&ehk=o4gp2IxXVDs3neUeQadu05RX%2fNt9%2fWoIO8tuZUh4jCM%3d&risl=&pid=ImgRaw&r=0'
    }
    // Add more products as needed
  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id')!;
      // Vous pouvez maintenant utiliser this.orderId pour récupérer les détails de la commande
    });
  }

}
