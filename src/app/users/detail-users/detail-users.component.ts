import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-detail-users',
  templateUrl: './detail-users.component.html',
  styleUrls: ['./detail-users.component.scss']
})
export class DetailUsersComponent implements OnInit {

  public id: string;
  public users: User[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.data.subscribe(trip => {
      this.users = <User[]>trip.detail;
    });
  }
}
