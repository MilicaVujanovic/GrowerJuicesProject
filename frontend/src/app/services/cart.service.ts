import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Juice } from '../shared/models/Juice';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart : Cart = this.getCartFromLocalStorage();
  private cartSubject : BehaviorSubject<Cart> =  new BehaviorSubject(this.cart);
  //Behaviour Subject

  constructor() { }
  addToCart(juice : Juice): void{
    let cartItem = this.cart.items.find(item => item.juice.id === juice.id);
    //prolazimo listom i treba da nadjemo iteme ciji se idijevi poklapaju(omni u korpi i oni van korpe)
    if(cartItem)
      return;

    this.cart.items.push(new CartItem (juice));
    this.setCartToLocalStorage();
  }

  removeFromCart(juiceId: string): void {
    this.cart.items = this.cart.items.filter(item => item.juice.id != juiceId );
    this.setCartToLocalStorage();
  }

  changeQunatity(juiceId:string, quntity:number){
    let cartItem = this.cart.items.find(item => item.juice.id === juiceId);
    if(!cartItem) return;

    cartItem.quantity = quntity;
    cartItem.price = quntity * cartItem.juice.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value; //latest value od subject
  }

  private setCartToLocalStorage(): void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price,0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity,0);


    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);

  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart()
  }
}
