import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import {Partner} from "../../shared/models/partner.model";
import {PartnersService} from "../../shared/services/partners.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public partners: Partner[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private usersService: UsersService,
    private partnersService: PartnersService
  ) { }

  ngOnInit() {
    // this.updateListUsers();
    this.updateListPartners();
  }

  // private updateListUsers() {
  //   this.usersService.getUsersList().subscribe((users: User[]) => {
  //     this.users = users;
  //   });
  // }

  private updateListPartners() {
    this.partnersService.getPartnersList().subscribe((partners: Partner[]) => {
      this.partners = partners;
    });
  }
}
