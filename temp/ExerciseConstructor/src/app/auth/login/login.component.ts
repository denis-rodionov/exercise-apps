import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('LoginComponent::ngOnInit()');
  }

  public login() {
    console.log('login clicked');
    this.authService.navigateToLoginService();
  }
}
