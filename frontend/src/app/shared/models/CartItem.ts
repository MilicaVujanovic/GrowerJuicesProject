import { Juice } from './Juice';

export class CartItem {
  quantity: number = 1;
  price: number;

  constructor(public juice: Juice) {
    this.price = juice.price; // Initialize the price based on the juice price
  }
}
