import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { ProfileComponent } from './profile-component/profile-component';
import { CategoryComponent } from './category-component/category-component';
import { AddressComponent } from './address-component/address-component';
import { CountryComponent } from './country-component/country-component';
import { CityComponent } from './city-component/city-component';
import { SupplierComponent } from './supplier-component/supplier-component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'categories',
    component: CategoryComponent
  },
  {
    path: 'addresses',
    component: AddressComponent
  },
  {
    path: 'countries',
    component: CountryComponent
  },
  {
    path: 'cities',
    component: CityComponent
  },
  {
    path: 'suppliers',
    component: SupplierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
