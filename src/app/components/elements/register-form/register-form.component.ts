import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  @Output() formEvent = new EventEmitter<string>();
  changeView() {
    this.formEvent.emit('login');
  }
}
