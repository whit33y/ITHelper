import { Component } from '@angular/core';
import { NewReportFormComponent } from '../../components/elements/new-report-form/new-report-form.component';

@Component({
  selector: 'app-new-report',
  standalone: true,
  imports: [NewReportFormComponent],
  templateUrl: './new-report.component.html',
  styleUrl: './new-report.component.css',
})
export class NewReportComponent {}
