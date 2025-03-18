import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-new-report-form',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './new-report-form.component.html',
  styleUrl: './new-report-form.component.css',
})
export class NewReportFormComponent {}
