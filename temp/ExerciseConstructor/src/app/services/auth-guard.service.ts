import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const result = this.checkLogin();
    console.log('AuthGuardService::canActivate');
    return result;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const result = this.checkLogin();
    console.log('AuthGuardService::canActivateChild');
    return result;
  }

  canLoad(route: Route): Observable<boolean> {
    const result = this.checkLogin();
    console.log('AuthGuardService::canLoad');
    return result;
  }

  private checkLogin(): Observable<boolean> {
    console.log('AuthGuardService::checkLogin()');
    return Observable.create(
      (observer) => {
        this.authService.getUser().subscribe(next => {
          console.log('AuthGuardService::checkLogin next: ', next);
          observer.next(true);
        }, error => {
          console.log('AuthGuardService::checkLogin error: ', error);
          this.authService.redirectToLoginPage();
          observer.next(false);
        });
      });
  }
}
