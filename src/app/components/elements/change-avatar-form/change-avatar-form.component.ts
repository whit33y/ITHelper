import { Component, Input } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-change-avatar-form',
  standalone: true,
  imports: [],
  templateUrl: './change-avatar-form.component.html',
  styleUrl: './change-avatar-form.component.css',
})
export class ChangeAvatarFormComponent {
  constructor(private storageService: StorageService) {}

  @Input() userId?: string;

  selectedFile?: File;
  previewUrl?: string;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadImage();
    }
  }

  addFileUserId(userId: string, fileId: string) {
    this.storageService.postUserId(userId, fileId).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  uploadImage() {
    if (this.selectedFile) {
      this.storageService.uploadImage(this.selectedFile).subscribe({
        next: (fileId) => {
          if (fileId) {
            this.previewUrl = this.storageService.getImageLink(fileId);
            this.addFileUserId(this.userId!, fileId);
          }
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        },
        complete: () => {},
      });
    }
  }
}
