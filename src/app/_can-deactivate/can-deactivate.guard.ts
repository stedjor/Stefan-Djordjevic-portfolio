import { Injectable } from '@angular/core';
import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ComponentCanDeactivate } from './component-can-deactivate';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(
    component: ComponentCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
