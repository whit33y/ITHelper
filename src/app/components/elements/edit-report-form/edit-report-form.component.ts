import { Component, Input } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { environment } from '../../../../../environment';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
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

  adminList: any[] = [];
  constructor(private usersService: UsersService) {
    this.usersService
      .getTeamMembershipsById(environment.adminsGroupId)
      .subscribe({
        next: (response) => {
          this.adminList = response.memberships;
          console.log(this.adminList);
        },
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
    } else if (status === 'resolved') {
      return 'Rozwiązany';
    } else if (status === 'closed') {
      return 'Zamknięte';
    }
    return '';
  }

  changePriority(priority: string) {
    if (priority === 'low') {
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
}
