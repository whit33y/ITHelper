import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../components/elements/button/button.component';
import { CommentService } from '../../services/comment.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../services/interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { CommentCardComponent } from '../../components/elements/comment-card/comment-card.component';
import { CommentDocuments } from '../../services/interfaces/comment.interface';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ReactiveFormsModule,
    CommentCardComponent,
  ],
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

  user?: User;
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  commentForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

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
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    this.loadComments(this.id!);
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

  comments: CommentDocuments[] = [];
  loadComments(post_id: string) {
    this.commentService.getReportComments(post_id).subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Loaded comments.');
      },
    });
  }

  addComment() {
    this.commentService
      .postNewComment(
        this.id!,
        this.commentForm.value.comment!,
        this.user?.$id!
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Added');
        },
      });
  }
}
