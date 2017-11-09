import { Component } from '@angular/core';
import { UsersService } from './shared/services/users.service';
import { ToasterConfig } from 'angular2-toaster';
import { toastConfig } from './shared/toast.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sideBarIsShows: boolean = false;
  public toasterconfig : ToasterConfig = new ToasterConfig(toastConfig);

  constructor(
    public usersService: UsersService
  ) {
    this.sideBarIsShows = this.usersService.isLogged.getValue();
    this.usersService.isLogged.subscribe((isLoggedIn: boolean) => {
      this.sideBarIsShows = isLoggedIn;
    });
  }
}
