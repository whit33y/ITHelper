import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-report-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './new-report-form.component.html',
  styleUrl: './new-report-form.component.css',
})
export class NewReportFormComponent {
  newReport = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    category: new FormControl('hardware'),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(600),
    ]),
    priority: new FormControl('low'),
  });
}
