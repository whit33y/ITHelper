import { Injectable } from '@angular/core';
import { Databases, Query, Storage } from 'appwrite';
import { environment } from '../../../environment';
import { client } from '../lib/appwrite';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageDocuments } from './interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private database: Databases;
  private storage: Storage;
  private databaseId = environment.databaseId;
  private storageId = environment.storageId;
  private storageCollectionId = environment.storageCollectionId;

  constructor() {
    this.storage = new Storage(client);
    this.database = new Databases(client);
  }

  getReportImages(report_id: string): Observable<StorageDocuments[]> {
    if (!report_id) {
      return of([]);
    }
    return from(
      this.database.listDocuments(this.databaseId, this.storageCollectionId, [
        Query.equal('reportId', report_id),
        Query.orderDesc('$createdAt'),
      ])
    ).pipe(
      map((response) => response.documents as StorageDocuments[]),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  uploadImage(file: File): Observable<string | null> {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'image/webp',
      'image/bmp',
    ];
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type');
      return of(null);
    }

    const promise = this.storage.createFile(this.storageId, 'unique()', file);
    return from(promise).pipe(
      map((response) => response.$id),
      catchError((error) => {
        console.error('Upload failed:', error);
        return of(null);
      })
    );
  }

  getImagePreview(fileId: string): string {
    return this.storage.getFilePreview(this.storageId, fileId);
  }

  deleteImage(fileId: string): Observable<boolean> {
    const promise = this.storage.deleteFile(this.storageId, fileId);
    return from(promise).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Delete failed:', error);
        return of(false);
      })
    );
  }

  postFileReportId(fileId: string, reportId: string): Observable<any> {
    return from(
      this.database.createDocument(
        this.databaseId,
        this.storageCollectionId,
        'unique()',
        {
          reportId,
          fileId,
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
}
