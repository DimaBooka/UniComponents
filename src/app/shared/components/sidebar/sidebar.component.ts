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
  public permissions: string = null;
  constructor(
    public usersService: UsersService
  ) {
    this.usersService.checkUserAndToken();
    this.loggedIn = this.showSideBar = this.usersService.isLogged.getValue();

    this.usersService.isLogged.subscribe((isLoggedIn: boolean) => {
      this.loggedIn = isLoggedIn;
      this.showSideBar = isLoggedIn;
    });

    this.usersService.permission.subscribe((permission: string)=> {
      if (permission) {
        this.permissions = permission;
      }
    });
  }

  ngOnInit() {
  }
}
