import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent {
  @Input() authorId = '';
  @Input() userId = '';
  @Input() username = '';
  @Input() postId = '';
  @Input() comment = '';
  @Input() commentId = '';
  @Output() emitDelete = new EventEmitter<string>();

  deleteItem(value: string) {
    this.emitDelete.emit(value);
  }
}
