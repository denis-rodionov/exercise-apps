import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { ExerciseService } from './execise.service';
import { FirebaseApp } from '@angular/fire';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private router: Router, private firebaseAuth: AngularFireAuth) {
    this.init();
  }

  init() {
    this.user = this.firebaseAuth.authState;
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

  public getUser(): User {
      let user: any = sessionStorage.getItem('user');
      console.log('from session storage: ' + user);
      if (user) {
          try {
              user = JSON.parse(user);
              console.log('parsed user json: ' + user);
              if (user && user.email && user.uid) {
                  return new User(user.uid, user.email);
              }
          } catch (error) {
            console.log('failed to get user: ' + error);
            return null;
          }
      }
    }

  public signup(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password);
  }

  public login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(
        val => this.init()
      );
  }

  public logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(val => {
        console.log('successfuly logged out: ' + val);
        sessionStorage.clear();
        this.router.navigateByUrl('auth');
      })
      .catch(err => alert(err));
  }

  public isLoggedIn(): boolean {
    return this.getUser() != null;
  }
}
