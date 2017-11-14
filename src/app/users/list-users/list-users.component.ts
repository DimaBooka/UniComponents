import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public users: User[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.updateListUsers();
  }

  private updateListUsers() {
    this.usersService.getUsersList().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
