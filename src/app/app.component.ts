import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarVerticalComponent } from './components/navbar-vertical/navbar-vertical.component';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReportService } from './services/report.service';
import { User } from './services/interfaces/auth.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    NavbarVerticalComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ITHelper';
  active = 'new';
  isLoading$!: Observable<boolean>;
  constructor(
    private router: Router,
    private authService: AuthService,
    private reportService: ReportService
  ) {}
  user?: User;
  ngOnInit() {
    this.isLoading$ = this.authService.isLoading$;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.split('/').pop();
        this.active = currentRoute || '';
      }
    });
    this.authService.loggedInUser$.subscribe({
      next: (response) => {
        this.user = response;
      },
    });
  }
}
