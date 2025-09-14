import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItem';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cart!:Cart;

  constructor(private cartService: CartService){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }


  ngOnInit(): void {
      
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.juice.id);
  }

  changeQunatity(cartItem: CartItem, quntityInString: string){
    const quantity = parseInt(quntityInString);
    this.cartService.changeQunatity(cartItem.juice.id, quantity);

  }

}
