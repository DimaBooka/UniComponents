import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class NoAuthGuard implements CanActivate{

  constructor(private authService: AuthService,
              public usersService: UsersService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.getToken()) {
      return true;
    }
    this.usersService.isLogged.next(true);
    this.router.navigate(['/games']);
    return false;
  }
}
