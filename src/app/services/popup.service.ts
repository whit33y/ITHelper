import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  popupVisible = signal<boolean>(false);
  popupText = signal<string>('');

  constructor() {}

  showPopup(text: string) {
    this.popupVisible.set(true);
    this.popupText.set(text);
    setTimeout(() => {
      this.popupVisible.set(false);
      this.popupText.set('');
    }, 3000);
  }

  closePopup() {
    this.popupVisible.set(false);
    this.popupText.set('');
  }
}
