import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public login() {
    console.log('Login with email: ', this.email);
    this.authService.login(this.email, this.password);
  }
}
