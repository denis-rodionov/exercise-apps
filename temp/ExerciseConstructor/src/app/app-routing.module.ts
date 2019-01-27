import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { RootComponent } from './root/root.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';

const routes: Routes = [
  { path: '',
        component: ExerciseListComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: '', loadChildren: './partners/partners.module#PartnersModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
