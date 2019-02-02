import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  public canActivate(): boolean {
    const user = this.authService.getUser();

    if (user == null) {
        this.router.navigate(['auth']);
        return false;
    }

    return true;
  }
}
