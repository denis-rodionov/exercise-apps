import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { RootComponent } from './root/root.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { LoginComponent } from './auth/login/login.component';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';

const routes: Routes = [
  { path: 'exercises/new', component: ExerciseDetailsComponent },
  { path: 'exercises/:id', component: ExerciseDetailsComponent },
  { path: 'exercises',
        component: ExerciseListComponent,
        canActivate: [ AuthGuardService ] },
  { path: 'auth', component: LoginComponent },
  { path: '', redirectTo: 'exercises', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
