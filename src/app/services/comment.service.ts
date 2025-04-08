import { Injectable } from '@angular/core';
import { client } from '../lib/appwrite';
import { environment } from '../../environments/environment';
import { Databases, Query } from 'appwrite';
import { catchError, from, map, Observable, of } from 'rxjs';
import { CommentDocuments } from './interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private database: Databases;
  private databaseId = environment.databaseId;
  private commentsCollectionId = environment.commentsCollectionId;

  constructor() {
    this.database = new Databases(client);
  }

  //get get get get get get get get get get get get get get get get

  getReportComments(report_id: string): Observable<CommentDocuments[]> {
    if (!report_id) {
      return of([]);
    }
    return from(
      this.database.listDocuments(this.databaseId, this.commentsCollectionId, [
        Query.equal('report_id', report_id),
        Query.orderDesc('$createdAt'),
      ])
    ).pipe(
      map((response) => response.documents as CommentDocuments[]),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  //get get get get get get get get get get get get get get get get

  //post post post post post post post post post post post post post

  postNewComment(
    report_id: string,
    text: string,
    user_id: string,
    username: string
  ): Observable<CommentDocuments | null> {
    return from(
      this.database.createDocument(
        this.databaseId,
        this.commentsCollectionId,
        'unique()',
        {
          report_id,
          user_id,
          text,
          username,
        }
      )
    ).pipe(
      map((response) => response as CommentDocuments),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  //post post post post post post post post post post post post post

  //delete delete delete delete delete delete delete delete delete

  deleteComment(comment_id: string): Observable<any> {
    return from(
      this.database.deleteDocument(
        this.databaseId,
        this.commentsCollectionId,
        comment_id
      )
    ).pipe(
      map((response) => response),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  //delete delete delete delete delete delete delete delete delete
}
