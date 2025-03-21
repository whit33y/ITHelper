import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../components/elements/button/button.component';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css',
})
export class ReportDetailsComponent {
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
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
  }

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
