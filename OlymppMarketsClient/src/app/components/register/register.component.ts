import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.authService.register(this.username, this.password).subscribe(
      (response: any) => {
        this.router.navigate(['/login']); 
      },
      (error: any) => {
        console.error('Registration failed', error);
      }
    );
  }
}
