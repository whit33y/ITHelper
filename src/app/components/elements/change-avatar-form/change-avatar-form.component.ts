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
  @Input() userId?: string;
  isAvatarAvailable = false;
  fileId?: string;
  selectedFile?: File;
  previewUrl?: string;
  avatarId?: string;
  loading: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.getUserAvatar(this.userId!).subscribe({
      next: (response) => {
        if (response.length === 0) {
          this.isAvatarAvailable = false;
        } else {
          this.isAvatarAvailable = true;
          this.fileId = response[0].fileId;
        }
      },
    });
    this.getAvatarId();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      if (this.isAvatarAvailable === false) {
        this.uploadImage();
      } else {
        this.updateImage();
      }
    }
  }

  addFileUserId(userId: string, fileId: string) {
    this.storageService.postUserId(userId, fileId).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        window.location.reload();
      },
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

  updateImage() {
    this.loading = true;
    this.deleteImage(this.fileId!);
    if (this.selectedFile) {
      this.storageService.uploadImage(this.selectedFile).subscribe({
        next: (fileId) => {
          if (fileId) {
            this.previewUrl = this.storageService.getImageLink(fileId);
            this.changeImageId(this.userId!, fileId, this.avatarId!);
          }
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        },
        complete: () => {},
      });
    }
  }

  changeImageId(userId: string, fileId: string, avatarId: string) {
    this.storageService.putUserFileId(userId, fileId, avatarId).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
        window.location.reload();
      },
    });
  }

  deleteImage(fileId: string) {
    this.storageService.deleteImage(fileId).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  getAvatarId() {
    this.storageService.getUserAvatar(this.userId!).subscribe({
      next: (response) => {
        this.avatarId = response[0].$id;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }
}
