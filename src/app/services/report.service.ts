import { Injectable } from '@angular/core';
import { Databases, Query } from 'appwrite';
import { client } from '../lib/appwrite';
import { environment } from '../../../environment';
import { catchError, from, map, Observable, of } from 'rxjs';
import { CommentsDocuments } from './interfaces/comments.interface';
import { ReportDocuments } from './interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private database: Databases;
  private databaseId = environment.databaseId;
  private reportsCollectionId = environment.reportsCollectionId;
  private commentsCollectionId = environment.commentsCollectionId;
  constructor() {
    this.database = new Databases(client);
  }

  //get get get get get get get get get get get get get get get get

  getUserReports(user_id: string): Observable<ReportDocuments[]> {
    if (!user_id) {
      return of([]);
    }
    return from(
      this.database.listDocuments(this.databaseId, this.reportsCollectionId, [
        Query.equal('user_id', user_id),
        Query.orderDesc('$createdAt'),
      ])
    ).pipe(
      map((response) => response.documents as ReportDocuments[]),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  getReportComments(report_id: string): Observable<CommentsDocuments[]> {
    if (!report_id) {
      return of([]);
    }
    return from(
      this.database.listDocuments(this.databaseId, this.commentsCollectionId, [
        Query.equal('report_id', report_id),
        Query.orderDesc('$createdAt'),
      ])
    ).pipe(
      map((response) => response.documents as CommentsDocuments[]),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  //get get get get get get get get get get get get get get get get

  //post post post post post post post post post post post post post

  postNewReport(
    user_id: string,
    title: string,
    category: string,
    priority: string,
    description: string
  ): Observable<ReportDocuments | null> {
    return from(
      this.database.createDocument(
        this.databaseId,
        this.reportsCollectionId,
        'unique()',
        {
          user_id,
          title,
          category,
          description,
          priority,
        }
      )
    ).pipe(
      map((response) => response as ReportDocuments),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  postNewComment(
    report_id: string,
    text: string,
    user_id: string
  ): Observable<CommentsDocuments | null> {
    return from(
      this.database.createDocument(
        this.databaseId,
        this.commentsCollectionId,
        'unique()',
        {
          user_id,
          report_id,
          text,
        }
      )
    ).pipe(
      map((response) => response as CommentsDocuments),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  //post post post post post post post post post post post post post
}
