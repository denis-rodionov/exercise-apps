import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private router: Router, private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    this.firebaseAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
          sessionStorage.setItem('user', JSON.stringify({
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              providerId: user.providerId,
              uid: user.uid
          }));
          this.router.navigate(['/']);
      }
    });
  }

  public signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('successfully signed up', value);
      })
      .catch(err => {
        console.log('signin failed: ', err.message);
      });
  }

  public login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('successgully login');
      })
      .catch(err => {
        console.log('failed to login',err.message);
      });
  }

  public logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  public isLoggedIn(): boolean {
    return true;
  }
}
