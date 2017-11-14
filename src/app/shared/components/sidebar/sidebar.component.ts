import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public showSideBar: boolean = false;
  public loggedIn: boolean = false;
  public permissions: any = null;
  constructor(
    public usersService: UsersService
  ) {
    this.usersService.checkUserAndToken();
    this.loggedIn = this.showSideBar = this.usersService.isLogged.getValue();

    if (this.loggedIn) {
      this.checkPermissions();
    }

    this.usersService.isLogged.subscribe((isLoggedIn: boolean) => {
      this.loggedIn = isLoggedIn;
      this.showSideBar = isLoggedIn;

      if (this.loggedIn) {
        this.checkPermissions();
      }
    });
  }

  ngOnInit() {
  }

  checkPermissions() {
    this.usersService.permission ? this.permissions = this.usersService.permission :
      this.usersService.getPermissions().subscribe(permissions => {
        this.permissions = permissions;
      });
  };
}
