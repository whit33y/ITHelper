import { Component, effect } from '@angular/core';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  popupVisible: boolean = false;
  popupText: string = '';

  constructor(private popupService: PopupService) {
    effect(() => {
      this.popupVisible = this.popupService.popupVisible();
      this.popupText = this.popupService.popupText();
    });
  }

  closePopup() {
    this.popupService.closePopup();
  }
}
