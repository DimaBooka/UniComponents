import { Component, OnInit } from '@angular/core';
import { PartnerGames } from '../../shared/models/partner-games.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../../shared/services/games.service';
import { Partner } from '../../shared/models/partner.model';
import { PartnersService } from '../../shared/services/partners.service';

@Component({
  selector: 'app-list-partner-games',
  templateUrl: './list-partner-games.component.html',
  styleUrls: ['./list-partner-games.component.scss']
})
export class ListPartnerGamesComponent implements OnInit {

  public partners: Partner[] = [];
  constructor(
    private partnersService: PartnersService
  ) { }

  ngOnInit() {
    this.updateListPartners();
  }

  private updateListPartners() {
    this.partnersService.getPartnersList().subscribe((partners: Partner[]) => {
      this.partners = partners;
    });
  }

}
