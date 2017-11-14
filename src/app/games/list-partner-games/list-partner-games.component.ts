import { Component, OnInit } from '@angular/core';
import { PartnerGames } from '../../shared/models/partner-games.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../../shared/services/games.service';
import { Partner } from '../../shared/models/partner.model';
import { PartnersService } from '../../shared/services/partners.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-list-partner-games',
  templateUrl: './list-partner-games.component.html',
  styleUrls: ['./list-partner-games.component.scss']
})
export class ListPartnerGamesComponent implements OnInit {

  public partners: Partner[] = [];
  public partnersGame: PartnerGames[] = [];
  constructor(
    private partnersService: PartnersService,
    private gamesService: GamesService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.permission ? this.init() :
      this.usersService.getPermissions().subscribe(permission => { this.init(); });
  }

  init() {
   this.usersService.permission !== 'Admin' ?
      this.updateGamePartners() : this.updateListPartners();
  }

  private updateListPartners() {
    this.partnersService.getPartnersList().subscribe((partners: Partner[]) => {
      this.partners = partners;
    });
  }

  private updateGamePartners() {
    this.gamesService.getGamePartnersList().subscribe(resp => {
      this.partnersGame = resp;
    });
  }
}
