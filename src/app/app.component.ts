import { Component } from '@angular/core';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showSideBar: boolean = false;

  constructor(
    public usersService: UsersService
  ) {
    this.usersService.checkUserAndToken();
    this.usersService.isLogged.subscribe((isLoggedIn: boolean) => {
      this.showSideBar = isLoggedIn;
    });
  }
}
