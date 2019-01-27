import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
  }

  public redirectToLoginPage() {
    this.router.navigate(['auth', 'login']);
  }

  public navigateToLoginService() {
    console.log('navigateToLoginService');
  }

  public getUser(): Observable<User> {
    return Observable.create(observer => {
      console.log('Returning cached user...');
      observer.next(this.user);
    });
  }

  public logout(): Observable<Object> {
    this.user = undefined;
    console.log('Navigating to the logout URL');
    return Observable.create(observer => {
      console.log('Returning cached user...');
      observer.next(this.user);
    });
  }

  public isLoggedIn(): boolean {
    return true;
  }
}
