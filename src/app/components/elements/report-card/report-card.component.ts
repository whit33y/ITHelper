import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [],
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
}
