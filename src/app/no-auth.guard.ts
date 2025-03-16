import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoading$.pipe(
      first((loading) => !loading),
      switchMap(() => this.authService.loggedInUser$),
      first(),
      map((user) => {
        if (user) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
