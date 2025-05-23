import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { User } from '../../services/interfaces/auth.interface';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() userName = 'username';
  @Input() active = '';
  @Input() isAdmin = false;
  @Input() userId?: string;
  isMenuOpen = false;
  user?: User;
  image: any;
  imageLink?: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private popupService: PopupService
  ) {
    effect(() => {
      if (this.popupService.popupVisible() === true) {
        setTimeout(() => {
          this.getUserImage(this.user?.$id!);
        }, 1000);
      }
    });
  }

  ngOnInit() {
    this.authService.loggedInUser$.subscribe({
      next: (response) => {
        this.user = response;
        this.getUserImage(this.user?.$id!);
      },
    });
  }

  getUserImage(userId: string) {
    this.storageService.getUserAvatar(userId).subscribe({
      next: (response) => {
        this.imageLink = this.storageService.getImageLink(response[0].fileId);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }

  sendLogout() {
    this.authService.logout();
  }

  @ViewChild('menu') menuElement!: ElementRef;
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isMenuOpen && !this.menuElement?.nativeElement.contains(target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }
}
