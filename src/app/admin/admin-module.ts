import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { ProfileComponent } from './profile-component/profile-component';
import { CategoryComponent } from './category-component/category-component';
import { AddressComponent } from './address-component/address-component';
import { CountryComponent } from './country-component/country-component';
import { CityComponent } from './city-component/city-component';
import { SupplierComponent } from './supplier-component/supplier-component';

import { SharedModule } from '../shared/shared-module';
import { CategoryFormDialogComponent } from './category-component/category-form-dialog.component/category-form-dialog.component';
import { AddressFormDialogComponent } from './address-component/address-form-dialog.component/address-form-dialog.component';
import { CountryFormDialogComponent } from './country-component/country-form-dialog.component/country-form-dialog.component';
import { CityFormDialogComponent } from './city-component/city-form-dialog.component/city-form-dialog.component';
import { SupplierFormDialogComponent } from './supplier-component/supplier-form-dialog.component/supplier-form-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    CategoryComponent,
    CategoryFormDialogComponent,
    AddressComponent,
    AddressFormDialogComponent,
    CountryComponent,
    CountryFormDialogComponent,
    CityComponent,
    CityFormDialogComponent,
    SupplierComponent,
    SupplierFormDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
