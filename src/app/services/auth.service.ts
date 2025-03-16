import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ID, Account } from 'appwrite';
import { client } from '../lib/appwrite';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private account: Account;
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();
  constructor(private router: Router) {
    this.account = new Account(client);
    this.checkCurrentSession();
  }

  async login(email: string, password: string) {
    await this.account.createEmailPasswordSession(email, password);
    const user = await this.account.get();
    this.loggedInUserSubject.next(user);
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
