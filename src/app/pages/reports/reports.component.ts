import { Component } from '@angular/core';
import { ReportCardComponent } from '../../components/elements/report-card/report-card.component';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/interfaces/auth.interface';
import { ReportDocuments } from '../../services/interfaces/report.interface';
import { PaginationComponent } from '../../components/elements/pagination/pagination.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReportCardComponent, PaginationComponent, ReactiveFormsModule],
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
        if (this.admin) {
          this.loadLimitAdminReports();
          this.loadPaginationAdminRaports(this.limitPagination, 0);
        } else {
          this.loadLimitReports();
          this.loadPaginationRaports(this.limitPagination, 0);
        }
      },
    });
  }

  sortControl = new FormControl('');
  sortArray = ['Data', 'Status', 'Priorytet'];

  reports: ReportDocuments[] = [];

  adminReports: ReportDocuments[] = [];

  loadPaginationRaports(limit: number, offset: number) {
    this.reportService
      .getUserReportsPagination(this.user?.$id!, limit, offset)
      .subscribe({
        next: (response) => {
          this.reports = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {},
      });
  }

  loadPaginationAdminRaports(limit: number, offset: number) {
    this.reportService.getAllReportsPagination(limit, offset).subscribe({
      next: (response) => {
        this.adminReports = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
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
        this.maxPageReports = Math.ceil(
          this.reportLimit / this.limitPagination
        );
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  loadLimitAdminReports() {
    this.reportService.getAllReportsPaginationLength().subscribe({
      next: (response) => {
        this.reportLimit = response;
        this.maxPageReports = Math.ceil(
          this.reportLimit / this.limitPagination
        );
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }

  nextPage() {
    if (this.currentPageReports < this.maxPageReports) {
      this.currentPageReports++;
      const offset = (this.currentPageReports - 1) * this.limitPagination;
      if (this.admin) {
        this.loadPaginationAdminRaports(this.limitPagination, offset);
      } else {
        this.loadPaginationRaports(this.limitPagination, offset);
      }
    }
  }

  prevPage() {
    if (this.currentPageReports > 1) {
      this.currentPageReports--;
      const offset = (this.currentPageReports - 1) * this.limitPagination;
      if (this.admin) {
        this.loadPaginationAdminRaports(this.limitPagination, offset);
      } else {
        this.loadPaginationRaports(this.limitPagination, offset);
      }
    }
  }
}
