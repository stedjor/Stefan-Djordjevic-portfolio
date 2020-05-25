import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    setTimeout(() => {
      if (this.authService.isLoggedIn !== true) {
        alert(`You haven't permission to use this page,
                  please log in, and enjoy.`);
        this.router.navigate(['login']);
        return false;
      }
    }, 100)
    return true;
  }
}
