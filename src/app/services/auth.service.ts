import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ID, Account } from 'appwrite';
import { client } from '../lib/appwrite';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private account: Account;
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();
  private userGroupSubject = new BehaviorSubject<any>(null);
  userGroup$ = this.userGroupSubject.asObservable();
  constructor(private router: Router, private usersService: UsersService) {
    this.account = new Account(client);
    this.checkCurrentSession();
  }

  async login(email: string, password: string) {
    await this.account.createEmailPasswordSession(email, password);
    const user = await this.account.get();
    this.loggedInUserSubject.next(user);
    window.location.reload();
  }

  async register(email: string, password: string, name: string) {
    try {
      await this.account.create(ID.unique(), email, password, name);
      return this.login(email, password);
    } catch (error) {
      console.error('Registration failed: ', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSession('current');
      this.loggedInUserSubject.next(null);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Loggout failed: ', error);
      throw error;
    }
  }

  private isSessionChecked = false;
  private sessionCheckedSubject = new BehaviorSubject<boolean>(false);
  sessionChecked$ = this.sessionCheckedSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();

  async checkCurrentSession(): Promise<boolean> {
    if (this.isSessionChecked) {
      this.isLoadingSubject.next(false);
      return !!this.loggedInUserSubject.value;
    }

    try {
      const user = await this.account.get();
      this.loggedInUserSubject.next(user);
      this.usersService.getTeamById(environment.adminsGroupId).subscribe({
        next: (response) => {
          console.log(response);
          if (response.length === 0) {
            this.userGroupSubject.next(false);
          } else {
            this.userGroupSubject.next(true);
          }
        },
        error: (error) => {
          this.userGroupSubject.next(false);
        },
        complete: () => {
          console.log('Group finded');
        },
      });
      return true;
    } catch (error) {
      console.warn('No active session');
      this.loggedInUserSubject.next(null);
      return false;
    } finally {
      this.isSessionChecked = true;
      this.isLoadingSubject.next(false);
    }
  }
}
