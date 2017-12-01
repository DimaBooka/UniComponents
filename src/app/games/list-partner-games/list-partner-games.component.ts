import { Component, OnInit } from '@angular/core';
import { PartnerGame } from '../../shared/models/partner-games.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../../shared/services/games.service';
import { Partner } from '../../shared/models/partner.model';
import { PartnersService } from '../../shared/services/partners.service';
import { UsersService } from '../../shared/services/users.service';
import { ToasterService } from "angular2-toaster/src/toaster.service";
import { GameConfig } from '../../shared/models/game-config.model';

@Component({
  selector: 'app-list-partner-games',
  templateUrl: './list-partner-games.component.html',
  styleUrls: ['./list-partner-games.component.scss']
})
export class ListPartnerGamesComponent implements OnInit {

  public partners: Partner[] = [];
  public partnersGame: PartnerGame[] = [];
  public permissions: string;
  constructor(
    private partnersService: PartnersService,
    private gamesService: GamesService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private gameConfigsService: GamesService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    if (this.usersService.permission.value) {
      this.init();
    } else {
      this.usersService.getPermissions().subscribe((permission: string) => {
        if (permission) {
          this.init();
        }
      });
    }
  }

  init() {
    this.permissions = this.usersService.permission.value;
    this.permissions !== 'Admin' ?
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

  public openCreateGameConfig(createModal) {
    this.modalService.open(createModal).result.then(result => {
      this.gameConfigsService.showSuccessMessage('Game Config was successfully created');
    }, (reason) => {
      this.onCancel();
    });
  }

  public onCreate(newGameConfig: GameConfig, closeModal: Function) {
    this.gameConfigsService.createGameConfig(newGameConfig).subscribe(respGameConfig => {
      this.init();
      closeModal();
    });
  }

  private onCancel() {
  }
}
