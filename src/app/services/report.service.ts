import { Injectable } from '@angular/core';
import { Databases, Query } from 'appwrite';
import { client } from '../lib/appwrite';
import { environment } from '../../../environment';
import { catchError, from, map, Observable, of } from 'rxjs';

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

  getUserReports(user_id: string): Observable<any[]> {
    if (!user_id) {
      return of([]);
    }
    return from(
      this.database.listDocuments(this.databaseId, this.reportsCollectionId, [
        Query.equal('user_id', user_id),
        Query.orderDesc('$createdAt'),
      ])
    ).pipe(
      map((response) => response.documents),
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
  ): Observable<any> {
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
      map((response) => response as any),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  //post post post post post post post post post post post post post
}
