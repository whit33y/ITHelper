import { Injectable } from '@angular/core';
import { Databases, Storage } from 'appwrite';
import { environment } from '../../../environment';
import { client } from '../lib/appwrite';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  uploadImage(file: File): Observable<string | null> {
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
