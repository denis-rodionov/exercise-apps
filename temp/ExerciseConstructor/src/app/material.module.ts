import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatSelectModule,
  MatExpansionModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule
  ]
})
export class MaterialModule {}
