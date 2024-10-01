import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, 
  imports: [FormsModule,CommonModule]
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  errorMessage: string='';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loggedIn=>{
      if (loggedIn){
        this.router.navigate(['/']); 
      }
    })
  }
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']); 
      },
      (error) => {
          this.errorMessage=error.error.message;     
      }
    );
  }
}
