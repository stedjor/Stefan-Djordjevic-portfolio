import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecureGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    setTimeout(() => {
      if (this.authService.isLoggedIn) {
        this.router.navigate(['/profile']);
        return true;
      }
    }, 100)
    return true;
  }
}
