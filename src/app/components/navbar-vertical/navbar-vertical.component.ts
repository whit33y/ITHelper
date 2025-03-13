import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar-vertical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-vertical.component.html',
  styleUrl: './navbar-vertical.component.css',
})
export class NavbarVerticalComponent {
  routeName = 'Nowe złoszenie';
  active = 'new';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.split('/').pop();
        this.active = currentRoute || '';
        if (this.active === '') {
          this.routeName = 'Moje zgłoszenia';
        } else if (this.active === 'new') {
          this.routeName = 'Nowe zgłoszenie';
        } else if (this.active === 'settings') {
          this.routeName = 'Ustawienia';
        }
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
