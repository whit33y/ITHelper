import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output() formEvent = new EventEmitter<string>();
  changeView() {
    this.formEvent.emit('register');
  }
}
