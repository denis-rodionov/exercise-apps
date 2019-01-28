import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  public canActivate(): boolean {
    let user: any = sessionStorage.getItem('user');
    if (user) {
        try {
            user = JSON.parse(user);
            if (user && user.email && user.providerId) {
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }
    this.router.navigate(['auth']);
    return false;
  }
}
