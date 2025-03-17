import { Injectable } from '@angular/core';
import { Teams } from 'appwrite';
import { client } from '../lib/appwrite';
import { catchError, from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  client = client;
  teams = new Teams(client);

  getTeamList(): Observable<any> {
    return from(this.teams.list([])).pipe(
      map((response) => response as any),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }
}
