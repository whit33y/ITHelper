import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output() formEvent = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) {}

  changeView() {
    this.formEvent.emit('register');
  }

  loading = false;
  error = '';
  login(email: string, password: string) {
    this.loading = true;
    this.authService
      .login(email, password)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.loading = false;
        this.error = error;
        console.error('Something went wrong: ', error);
      });
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
}
