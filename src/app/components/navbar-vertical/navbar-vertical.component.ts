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
  @Input() active = '';
  @Input() isAdmin = false;
  routeName = 'Moje zgłoszenia';

  constructor(private router: Router) {}

  ngOnChanges() {
    if (this.active === '') {
      if (!this.isAdmin) {
        this.routeName = 'Moje zgłoszenia';
      } else {
        this.routeName = 'Wszystkie zgłoszenia';
      }
    } else if (this.active === 'new') {
      this.routeName = 'Nowe zgłoszenie';
    } else if (this.active === 'settings') {
      this.routeName = 'Ustawienia';
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
