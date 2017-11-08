import { Component } from '@angular/core';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sideBarIsShows: boolean = false;

  constructor(
    public usersService: UsersService
  ) {
    this.sideBarIsShows = this.usersService.isLogged.getValue();
    this.usersService.isLogged.subscribe((isLoggedIn: boolean) => {
      this.sideBarIsShows = isLoggedIn;
    });
  }
}
