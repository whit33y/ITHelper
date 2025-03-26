import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../services/interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { EditReportFormComponent } from '../../components/elements/edit-report-form/edit-report-form.component';

@Component({
  selector: 'app-manage-raport',
  standalone: true,
  imports: [EditReportFormComponent],
  templateUrl: './manage-raport.component.html',
  styleUrl: './manage-raport.component.css',
})
export class ManageRaportComponent {
  username?: string;
  title?: string;
  status?: string;
  description?: string;
  category?: string;
  priority?: string;
  assigned_to?: string;
  created?: string;
  index?: number;
  id?: string;
  user?: User;
  admin: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['username'] === undefined) {
        this.navigateTo('/');
      }
      this.username = params['username'];
      this.title = params['title'];
      this.status = params['status'];
      this.description = params['description'];
      this.category = params['category'];
      this.priority = params['priority'];
      this.assigned_to = params['assigned_to'];
      this.created = params['created'];
      this.index = params['index'];
      this.id = params['id'];
    });
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    this.authService.userGroup$.subscribe({
      next: (response) => {
        this.admin = response;
        if (!this.admin) {
          this.navigateTo('/');
        }
      },
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
