import { Component } from '@angular/core';
import { UsersService } from './shared/services/users.service';
import { ToasterConfig } from 'angular2-toaster';
import { toastConfig } from './shared/toast.config';
import {Router} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sideBarIsShows: boolean = false;
  public toasterconfig : ToasterConfig = new ToasterConfig(toastConfig);

  constructor(
    public usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {
    this.sideBarIsShows = this.usersService.isLogged.getValue();
    this.usersService.isLogged.subscribe((isLoggedIn: boolean) => {
      this.sideBarIsShows = isLoggedIn;
    });

    if (this.router.isActive('/', true)) {
      if (this.authService.getToken()) {
        this.usersService.getPermissions().subscribe(permissions => {
          if (permissions === 'Admin') {
            this.router.navigate(['/games']);
          } else {
            this.router.navigate(['/games/partners']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
