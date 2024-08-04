import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importez ici si nécessaire

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Assurez-vous que le composant est autonome
  imports: [FormsModule] // Ajoutez FormsModule ici
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']); // Redirigez vers la page d'accueil ou une autre page après la connexion
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
