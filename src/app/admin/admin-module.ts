import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { ProfileComponent } from './profile-component/profile-component';
import { CategoryComponent } from './category-component/category-component';

import { SharedModule } from '../shared/shared-module';
import { CategoryFormDialogComponent } from './category-component/category-form-dialog.component/category-form-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    CategoryComponent,
    CategoryFormDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
