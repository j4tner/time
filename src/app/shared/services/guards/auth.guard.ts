import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private alert: AlertService, private data: DataService) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const active = await this.data.isActive();
    const isActive = !!active;
    if (!isActive) {
      this.alert.customMessage(
        'Active users only',
        'You must be logged into an active account to view this content.'
      );
    }
    return isActive;
  }
}
