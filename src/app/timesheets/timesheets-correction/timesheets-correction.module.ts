import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimesheetsCorrectionPage } from './timesheets-correction.page';

const routes: Routes = [
  {
    path: '',
    component: TimesheetsCorrectionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimesheetsCorrectionPage]
})
export class TimesheetsCorrectionPageModule {}
