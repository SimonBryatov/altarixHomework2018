import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  canActivate$ = this.authService.authStatus$.pipe(map((authStatus) => !authStatus))
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('Anonymous Guard');
      this.canActivate$.pipe(
        filter((isUnauthorizes) => !isUnauthorizes),
        tap(() => this.router.navigate(['todoList']))
      ).subscribe();
      return this.canActivate$
  }
}
