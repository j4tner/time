import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', loadChildren: './timesheets-list/timesheets-list.module#TimesheetsListPageModule' },
  { path: 'manager', loadChildren: './timesheets-manager/timesheets-manager.module#TimesheetsManagerPageModule' },
  { path: 'time-correction', loadChildren: './timesheets-correction/timesheets-correction.module#TimesheetCorrectionPageModule' },
  { path: 'locations', loadChildren: './locations/locations.module#LocationsPageModule' }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TimesheetsComponentModule {
  constructor() { }
}

