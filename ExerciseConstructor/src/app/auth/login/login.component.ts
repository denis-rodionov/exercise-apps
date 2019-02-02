import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isSignup = false;
  error = null;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.isSignup = url[0].path === 'signup';
    });
  }

  ngOnInit(): void {
  }

  login() {
    console.log('Login with email: ', this.email);
    this.authService.login(this.email, this.password)
    .then(val => 'successful login')
    .catch(err => {
      this.error = err;
    });
  }

  signUp() {
    console.log('Signing up with email: ', this.email);
    this.authService.signup(this.email, this.password)
    .then( value => {
      console.log('successful signup');
    })
    .catch( err => {
      this.error = err;
    });
  }
}
