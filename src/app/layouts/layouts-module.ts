import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing-module';
import { AdminLayoutComponent } from './admin-layout/admin-layout-component';
import { AuthLayoutComponent } from './auth-layout/auth-layout-component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule
  ]
})
export class LayoutsModule { }
