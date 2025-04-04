import { Injectable } from '@angular/core';
import { Databases, Query, Storage } from 'appwrite';
import { environment } from '../../../environment';
import { client } from '../lib/appwrite';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  AvatarDocuments,
  StorageDocuments,
} from './interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private database: Databases;
  private storage: Storage;
  private databaseId = environment.databaseId;
  private storageId = environment.storageId;
  private storageCollectionId = environment.storageCollectionId;
  private avatarCollectionId = environment.avatarCollectionId;

  constructor() {
    this.storage = new Storage(client);
    this.database = new Databases(client);
  }

  //get get get get get get get get get get get get get get get get

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
  getUserAvatar(user_id: string): Observable<AvatarDocuments[]> {
    if (!user_id) {
      return of([]);
    }
    return from(
      this.database.listDocuments(this.databaseId, this.avatarCollectionId, [
        Query.equal('userId', user_id),
        Query.orderDesc('$createdAt'),
      ])
    ).pipe(
      map((response) => response.documents as AvatarDocuments[]),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  getImagePreview(fileId: string): string {
    return this.storage.getFilePreview(this.storageId, fileId);
  }

  getImageLink(fileId: string): string {
    return this.storage.getFileView(this.storageId, fileId);
  }

  //get get get get get get get get get get get get get get get get

  //post post post post post post post post post post post post post

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

  postUserId(userId: string, fileId: string): Observable<any> {
    return from(
      this.database.createDocument(
        this.databaseId,
        this.avatarCollectionId,
        'unique()',
        {
          userId,
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

  //post post post post post post post post post post post post post

  //put put put put put put put put put put put put put put put put

  putUserFileId(
    userId: string,
    fileId: string,
    avatarId: string
  ): Observable<any> {
    return from(
      this.database.updateDocument(
        this.databaseId,
        this.avatarCollectionId,
        avatarId,
        {
          userId,
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

  //put put put put put put put put put put put put put put put put

  //delete delete delete delete delete delete delete delete delete

  deleteFileReportId(id: string): Observable<any> {
    return from(
      this.database.deleteDocument(
        this.databaseId,
        this.storageCollectionId,
        id
      )
    ).pipe(
      map((response) => response as any),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
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

  //delete delete delete delete delete delete delete delete delete
}
