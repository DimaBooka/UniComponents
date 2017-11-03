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

  constructor(
    public usersService: UsersService
  ) {
    this.usersService.isLogged.subscribe((isLoggedIn: boolean) => {
      this.loggedIn = isLoggedIn;
      this.showSideBar = isLoggedIn;
    });
  }

  ngOnInit() {
  }

}
