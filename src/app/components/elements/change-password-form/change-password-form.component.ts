import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css',
})
export class ChangePasswordFormComponent {
  constructor(private authService: AuthService) {}
  updatePassword = new FormGroup(
    {
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      retypePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: [
        this.passwordsMatchValidator,
        this.newPasswordDiffersValidator,
      ],
    }
  );

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const retypePassword = group.get('retypePassword')?.value;
    return newPassword === retypePassword ? null : { passwordsMismatch: true };
  }

  newPasswordDiffersValidator(group: AbstractControl): ValidationErrors | null {
    const oldPassword = group.get('oldPassword')?.value;
    const newPassword = group.get('newPassword')?.value;

    return oldPassword && newPassword && oldPassword === newPassword
      ? { newPasswordSameAsOld: true }
      : null;
  }
}
