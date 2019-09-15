import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { TimesheetsManagerPage } from './timesheets-manager.page';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  {
    path: '',
    component: TimesheetsManagerPage,
    children: [
      {
        path: 'payroll',
        children: [{ path: '', loadChildren: './payroll/payroll.module#PayrollPageModule' }]
      },
      {
        path: 'employees',
        children: [{ path: '', loadChildren: './employees/employees.module#EmployeesPageModule' }]
      },
      {
        path: 'codes',
        children: [{ path: '', loadChildren: './codes/codes.module#CodesPageModule' }]
      },
      {
        path: '',
        redirectTo: 'payroll',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [TimesheetsManagerPage],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TimesheetsManagerPageModule { }
