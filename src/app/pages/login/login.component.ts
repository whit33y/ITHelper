import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/elements/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/elements/register-form/register-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formType = 'login';
}
