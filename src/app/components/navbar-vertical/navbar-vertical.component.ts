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
  routeName = 'Moje zgłoszenia';
  @Input() active = '';

  constructor(private router: Router) {}

  ngOnChanges() {
    if (this.active === '') {
      this.routeName = 'Moje zgłoszenia';
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
