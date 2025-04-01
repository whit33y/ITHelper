import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage = 0;
  @Input() maxPage = 0;
  @Output() nextPage = new EventEmitter<boolean>(true);
  @Output() prevPage = new EventEmitter<boolean>(true);
}
