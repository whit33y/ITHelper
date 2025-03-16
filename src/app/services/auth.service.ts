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
      // tu ustawic przekierowanie
      // this.router.navigate(['/welcome']);
    } catch (error) {
      console.error('Loggout failed: ', error);
      throw error;
    }
  }

  private isSessionChecked = false;
  async checkCurrentSession(): Promise<void> {
    if (this.isSessionChecked) return;
    try {
      const user = await this.account.get();
      this.loggedInUserSubject.next(user);
    } catch (error) {
      console.warn('No active session');
      this.loggedInUserSubject.next(null);
    } finally {
      this.isSessionChecked = true;
    }
  }
}
