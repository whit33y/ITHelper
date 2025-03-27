import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.css',
})
export class ReportCardComponent {
  @Input() username = '';
  @Input() title = '';
  @Input() status = '';
  @Input() description = '';
  @Input() category = '';
  @Input() priority = '';
  @Input() assigned_to = '';
  @Input() created = '';
  @Input() index?: number;
  @Input() id = '';
  @Input() user_id = '';

  constructor(private router: Router) {}

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

  navigateTo(route: string) {
    this.router.navigate([route], {
      queryParams: {
        username: this.username,
        title: this.title,
        status: this.status,
        description: this.description,
        category: this.category,
        priority: this.priority,
        assigned_to: this.assigned_to,
        created: this.created,
        index: this.index,
        id: this.id,
        user_id: this.user_id,
      },
    });
  }
}
