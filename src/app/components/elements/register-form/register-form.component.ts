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
import { SpinnerComponent } from '../spinner/spinner.component';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  @Output() formEvent = new EventEmitter<string>();
  loading = false;
  error = '';

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  changeView() {
    this.formEvent.emit('login');
  }

  register(email: string, name: string, password: string) {
    this.loading = true;
    this.authService
      .register(email, password, name)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.loading = false;
        this.error = error;
      });
  }
}
