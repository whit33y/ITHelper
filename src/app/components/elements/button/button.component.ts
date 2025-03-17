import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() disabled = false;
  @Output() clickEvent = new EventEmitter<boolean>();

  sendClick() {
    if (!this.disabled) {
      this.clickEvent.emit(true);
    }
  }
}
