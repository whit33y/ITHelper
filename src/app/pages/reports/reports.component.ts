import { Component } from '@angular/core';
import { ReportCardComponent } from '../../components/elements/report-card/report-card.component';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/interfaces/auth.interface';
import { ReportDocuments } from '../../services/interfaces/report.interface';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReportCardComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  constructor(
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  user?: User;
  admin: boolean = false;
  ngOnInit() {
    this.authService.loggedInUser$.subscribe({
      next: (response) => {
        this.user = response;
      },
    });
    this.authService.userGroup$.subscribe({
      next: (response) => {
        this.admin = response;
      },
    });
    this.loadReports();
  }

  reports: ReportDocuments[] = [];
  loadReports() {
    this.reportService.getUserReports(this.user?.$id!).subscribe({
      next: (response) => {
        this.reports = response;
        console.log(response, this.reports);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed!');
      },
    });
  }
}
