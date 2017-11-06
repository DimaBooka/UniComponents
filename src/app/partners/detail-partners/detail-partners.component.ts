import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-partners',
  templateUrl: './detail-partners.component.html',
  styleUrls: ['./detail-partners.component.scss']
})
export class DetailPartnersComponent implements OnInit {

  public id: string;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

}
