import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate$ = this.authService.authStatus$
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('Auth Guard');
      this.canActivate$.pipe(
        filter((authStatus) => authStatus === false),
        tap(() => this.router.navigate(['']))
      ).subscribe();
      return this.canActivate$
        
  }
}
