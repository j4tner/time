import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/guards/auth.guard';

const routes: Routes = [
  // guarded
  // { path: '', loadChildren: './timesheets/timesheets.module#TimesheetsComponentModule', canActivate: [AuthGuard] },
  { path: '', loadChildren: './timesheets/timesheets.module#TimesheetsComponentModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
