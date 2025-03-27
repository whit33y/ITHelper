import { Injectable } from '@angular/core';
import { Databases, Query } from 'appwrite';
import { client } from '../lib/appwrite';
import { environment } from '../../../environment';
import { catchError, from, map, Observable, of } from 'rxjs';
import { ReportDocuments } from './interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private database: Databases;
  private databaseId = environment.databaseId;
  private reportsCollectionId = environment.reportsCollectionId;
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

  getAllReports(): Observable<ReportDocuments[]> {
    return from(
      this.database.listDocuments(this.databaseId, this.reportsCollectionId, [
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

  //post post post post post post post post post post post post post

  //put put put put put put put put put put put put put put put put

  putReport(
    report_id: string,
    user_id: string,
    title: string,
    category: string,
    priority: string,
    description: string,
    assigned_to: string,
    status: string
  ): Observable<ReportDocuments | null> {
    return from(
      this.database.updateDocument(
        this.databaseId,
        this.reportsCollectionId,
        report_id,
        {
          user_id,
          title,
          category,
          description,
          priority,
          assigned_to,
          status,
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

  //put put put put put put put put put put put put put put put put
}
