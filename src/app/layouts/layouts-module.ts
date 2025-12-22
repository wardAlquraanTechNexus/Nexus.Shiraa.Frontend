import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutsRoutingModule } from './layouts-routing-module';
import { AdminLayoutComponent } from './admin-layout/admin-layout-component';
import { AuthLayoutComponent } from './auth-layout/auth-layout-component';
import { SharedModule } from '../shared/shared-module';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutsRoutingModule,
    SharedModule
   
  ]
})
export class LayoutsModule { }
