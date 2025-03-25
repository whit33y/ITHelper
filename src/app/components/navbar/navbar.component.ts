import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  isMenuOpen = false;

  constructor(private router: Router, private authService: AuthService) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  sendLogout() {
    this.authService.logout();
  }
}
