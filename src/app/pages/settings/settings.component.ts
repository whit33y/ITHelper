import { Component } from '@angular/core';
import { ChangePasswordFormComponent } from '../../components/elements/change-password-form/change-password-form.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/interfaces/auth.interface';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ChangePasswordFormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  user?: User;
  constructor(private authService: AuthService) {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }
}
