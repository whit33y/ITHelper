import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  @Output() formEvent = new EventEmitter<string>();
  changeView() {
    this.formEvent.emit('login');
  }

  clicked(event: boolean) {
    console.log(event);
  }
}
