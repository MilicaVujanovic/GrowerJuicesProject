import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/Order';
import Swal from 'sweetalert2';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  order: Order = new Order();

  constructor(private orderService: OrderService, private router: Router, private cartServices: CartService) {}

  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        this.router.navigateByUrl('/checkout');
      }
    });
  }

  payOnDelivery() {
    this.orderService.payOnDelivery(this.order).subscribe({
      next: () => {
        Swal.fire({
          title: 'Payment on Delivery Successful!',
          html: `
          <div style="text-align: left;">
            <strong>Name:</strong><br>
            ${this.order.name}<br><br>
            <strong>Address:</strong><br>
            ${this.order.address}
          </div>
        `,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.cartServices.clearCart();
          this.router.navigate(['/']);
        });
      },
      error: () => {
        Swal.fire({
          title: 'Error!',
          text: 'There was an error processing your payment on delivery. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
