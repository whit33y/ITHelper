import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReportService } from '../../../services/report.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../services/interfaces/auth.interface';

@Component({
  selector: 'app-new-report-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './new-report-form.component.html',
  styleUrl: './new-report-form.component.css',
})
export class NewReportFormComponent {
  user?: User;
  constructor(
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }

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

  createReport() {
    this.reportService
      .postNewReport(
        this.user?.$id!,
        this.newReport.value.title!,
        this.newReport.value.category!,
        this.newReport.value.priority!,
        this.newReport.value.description!
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {},
      });
  }
}
