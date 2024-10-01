import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model'; // Assurez-vous d'importer le modèle
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone:true,
  imports: [CommonModule]
})
export class ProductsComponent implements OnInit {
 public products: Product[] = [];

  constructor(private readonly productService: ProductService,private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() : void {
    this.productService.getAllProducts().subscribe({
      next:(data)=> {
        this.products = data;
      },
      error:(error)=> {
        console.error('Error loading products', error);
      },
    })   
  };
  public addToCart(productName: string) {
    this.cartService.addToCart(productName);
    alert(`${productName} has been added to your cart!`); // Optionnel : notification à l'utilisateur
  }
}
