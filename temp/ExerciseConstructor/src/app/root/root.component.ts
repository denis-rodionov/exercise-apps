import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  title = 'Конструктор упражнений';
  public menuExpanded = false;

  constructor(public authService: AuthService, private router: Router) {
  }

  public ngOnInit() {
    console.log('#### AppComponent::ngOnInit');
  }

  addExercise() {
    this.router.navigateByUrl('exercises/new');
  }

  toggleMenuExpanded() {
    if (this.authService.isLoggedIn()) {
      this.menuExpanded = !this.menuExpanded;
    }
  }

  toggleDrawer(drawer: MatDrawer) {
    if (this.authService.isLoggedIn()) {
      drawer.toggle();
    }
  }
}
