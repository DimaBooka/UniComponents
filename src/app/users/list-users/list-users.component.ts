import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public users: any[] = [];
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
    this.usersService.getUsersList().subscribe((users: any[]) => {
      this.users = users;
    });
  }

  public openCreateUser(createModal) {
    this.modalService.open(createModal).result.then((result: any) => {
      this.onCreate(result);
    }, (reason) => {
      this.onCancel();
    });
  }

  private onCreate(newUser: any) {
    this.usersService.createUser(newUser).subscribe((respUser: any) => {
      this.updateListUsers();
    });
  }

  private onCancel() {

  }
}
