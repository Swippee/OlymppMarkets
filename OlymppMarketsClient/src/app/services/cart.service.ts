import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  cartItemCount = new BehaviorSubject<number>(0);

  addToCart(productName: string,price:number) {
    const existingItem = this.items.find(item => item.productName === productName);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ productName, quantity: 1,price });
    }

    this.cartItemCount.next(this.items.reduce((count, item) => count + item.quantity, 0));
  }

  getCartItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.cartItemCount.next(0);
  }
  removeFromCart(productName: string) {
    const itemIndex = this.items.findIndex(item => item.productName === productName);
  
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
      this.cartItemCount.next(this.items.reduce((count, item) => count + item.quantity, 0));
    }
  }
}
