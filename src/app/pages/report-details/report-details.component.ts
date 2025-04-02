import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { StorageService } from '../../services/storage.service';

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
  user_id?: string;

  user?: User;
  admin: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  commentForm = new FormGroup({
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

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
      this.user_id = params['user_id'];
    });

    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    this.authService.userGroup$.subscribe({
      next: (response) => {
        this.admin = response;
      },
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
        this.user?.$id!,
        this.user?.name!
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.loadComments(this.id!);
        },
      });
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loadComments(this.id!);
      },
    });
  }

  navigateTo(route: string) {
    if (route === '/') {
      this.router.navigate([route]);
    } else {
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

  selectedFile?: File;
  previewUrl?: string;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadImage();
    }
  }

  addFileReportId(fileId: string, reportId: string) {
    this.storageService.postFileReportId(fileId, reportId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed!');
      },
    });
  }

  uploadImage() {
    if (this.selectedFile) {
      this.storageService.uploadImage(this.selectedFile).subscribe({
        next: (fileId) => {
          if (fileId) {
            this.previewUrl = this.storageService.getImagePreview(fileId);
            this.addFileReportId(fileId, this.id!);
            console.log(this.previewUrl);
          }
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        },
        complete: () => {
          console.log('Image upload process completed.');
        },
      });
    }
  }
}
