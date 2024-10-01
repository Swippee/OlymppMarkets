import { Component,OnInit  } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; 

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }
  removeFromCart(productName: string) {
    this.cartService.removeFromCart(productName);
    this.cartItems = this.cartService.getCartItems(); // Mettre à jour la liste des éléments
  }
  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity); // Utilisez le prix stocké
    }, 0);
  }
}
