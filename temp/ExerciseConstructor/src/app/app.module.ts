import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { RootComponent } from './root/root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';

import { FormsModule } from '@angular/forms';
import { ExerciseService } from './services/execise.service';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';

@NgModule({
  declarations: [
    RootComponent,
    ExerciseListComponent,
    ExerciseDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ExerciseService
  ],
  bootstrap: [RootComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
