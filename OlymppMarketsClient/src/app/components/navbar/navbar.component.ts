import { Component,OnInit  } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItemCount = 0;  
  constructor(private authService: AuthService,  private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
    this.cartService.cartItemCount.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/'])
  }
}
