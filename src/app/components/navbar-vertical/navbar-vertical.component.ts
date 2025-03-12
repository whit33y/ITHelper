import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-vertical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-vertical.component.html',
  styleUrl: './navbar-vertical.component.css',
})
export class NavbarVerticalComponent {
  @Input() routeName = 'Aktywna ścieżka';
  @Input() active = 'new';
}
