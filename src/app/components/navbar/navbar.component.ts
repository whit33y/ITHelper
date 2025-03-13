import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() userName = 'Jakub Test';
  isMenuOpen = false;
  active = 'new';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.split('/').pop();
        this.active = currentRoute || '';
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
