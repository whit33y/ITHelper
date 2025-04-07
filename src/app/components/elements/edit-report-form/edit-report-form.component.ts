import { Component, Input } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { environment } from '../../../../../environment';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { ReportService } from '../../../services/report.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../services/interfaces/auth.interface';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-report-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './edit-report-form.component.html',
  styleUrl: './edit-report-form.component.css',
})
export class EditReportFormComponent {
  @Input() username?: string;
  @Input() title?: string;
  @Input() status?: string;
  @Input() description?: string;
  @Input() category?: string;
  @Input() priority?: string;
  @Input() assigned_to?: string;
  @Input() created?: string;
  @Input() index?: number;
  @Input() id?: string;
  @Input() user_id?: string;

  user?: User;
  adminList: any[] = [];
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private reportService: ReportService,
    private router: Router
  ) {
    this.usersService
      .getTeamMembershipsById(environment.adminsGroupId)
      .subscribe({
        next: (response) => {
          this.adminList = response.memberships;
          if (this.assigned_to) {
            this.manageReport.patchValue({
              assigned: this.assigned_to!,
            });
          }
          this.manageReport.patchValue({
            assigned: this.adminList[0].userName,
          });
        },
      });
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.manageReport.patchValue({
      priority: this.priority!,
    });
  }

  manageReport = new FormGroup({
    priority: new FormControl(this.priority!),
    assigned: new FormControl(this.assigned_to!),
    status: new FormControl('in_progress'),
  });

  changeStatus(status: string) {
    if (status === 'new') {
      return 'Nowy';
    } else if (status === 'in_progress') {
      return 'W trakcie';
    } else if (status === 'finished') {
      return 'Rozwiązany';
    } else if (status === 'closed') {
      return 'Zamknięte';
    }
    return '';
  }

  changePriority(priority: string) {
    if (priority === 'minimal') {
      return 'Niski';
    } else if (priority === 'medium') {
      return 'Średni';
    } else if (priority === 'high') {
      return 'Wysoki';
    } else if (priority === 'critical') {
      return 'Krytyczny';
    }
    return '';
  }

  changeCategory(category: string) {
    if (category === 'hardware') {
      return 'Sprzętowy';
    } else if (category === 'software') {
      return 'Programowy';
    } else if (category === 'other') {
      return 'Inny';
    }
    return '';
  }

  editReport() {
    this.reportService
      .putReport(
        this.id!,
        this.user_id!,
        this.title!,
        this.category!,
        this.manageReport.value.priority!,
        this.description!,
        this.manageReport.value.assigned!,
        this.manageReport.value.status!
      )
      .subscribe({
        next: (response) => {},
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.router.navigate(['/']);
        },
      });
  }
}
