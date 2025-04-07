import { Injectable } from '@angular/core';
import { Teams } from 'appwrite';
import { client } from '../lib/appwrite';
import { catchError, from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  client = client;
  teams = new Teams(client);

  //get get get get get get get get get get get get get get

  getTeamList(): Observable<any> {
    return from(this.teams.list([])).pipe(
      map((response) => response as any),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  getTeamById(id: string): Observable<any> {
    return from(this.teams.get(id)).pipe(
      map((response) => response as any),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  getTeamMembershipsById(id: string): Observable<any> {
    return from(this.teams.listMemberships(id)).pipe(
      map((response) => response as any),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  //get get get get get get get get get get get get get get
}
