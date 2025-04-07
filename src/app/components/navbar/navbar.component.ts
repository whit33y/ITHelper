import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { User } from '../../services/interfaces/auth.interface';

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
    private storageService: StorageService
  ) {}

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
  }

  sendLogout() {
    this.authService.logout();
  }
}
