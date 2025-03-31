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
        console.log(this.user);
      },
    });

    this.authService.userGroup$.subscribe({
      next: (response) => {
        this.admin = response;
        if (this.admin) {
          this.loadAdminReports();
          this.loadLimitAdminReports();
        } else {
          this.loadReports();
          this.loadLimitReports();
        }
      },
    });
  }

  reports: ReportDocuments[] = [];
  loadReports() {
    this.reportService.getUserReports(this.user?.$id!).subscribe({
      next: (response) => {
        this.reports = response;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed!');
      },
    });
  }

  maxPageReports = 0;
  currentPageReports = 1;
  limitPagination = 10;
  reportLimit = 0;
  loadLimitReports() {
    this.reportService.getUserReportsLength(this.user?.$id!).subscribe({
      next: (response) => {
        this.reportLimit = response;
        console.log(this.reportLimit);
        this.maxPageReports = Math.ceil(
          this.reportLimit / this.limitPagination
        );
        console.log(this.maxPageReports);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed!');
      },
    });
  }

  adminReports: ReportDocuments[] = [];
  loadAdminReports() {
    this.reportService.getAllReports().subscribe({
      next: (response) => {
        this.adminReports = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  maxPageAdminReports = 0;
  currentPageAdminReports = 1;
  limitPaginationAdmin = 10;
  reportLimitAdmin = 0;
  loadLimitAdminReports() {
    this.reportService.getAllReportsPaginationLength().subscribe({
      next: (response) => {
        this.reportLimitAdmin = response;
        console.log(this.reportLimitAdmin);
        this.maxPageAdminReports = Math.ceil(
          this.reportLimitAdmin / this.limitPaginationAdmin
        );
        console.log(this.maxPageAdminReports);
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
