import { Component, OnInit } from '@angular/core';
import { GameConfig } from '../../shared/models/game-config.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../shared/services/games.service';
import { ToasterService } from 'angular2-toaster';
import { PartnerGame } from '../../shared/models/partner-games.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-list-congif-games',
  templateUrl: './list-congif-games.component.html',
  styleUrls: ['./list-congif-games.component.scss']
})
export class ListCongifGamesComponent implements OnInit {

  // public gameConfigs: GameConfig[] = [];
  public partnersGame: PartnerGame[] = [];
  public selectedGameConfig: GameConfig;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private gameConfigsService: GamesService,
    private toasterService: ToasterService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.updateListGameConfigs();
    this.updateGamePartners();
  }

  private updateGamePartners() {
    this.gameConfigsService.getGamePartnersList().subscribe(resp => {
      this.partnersGame = [];
      resp.forEach(game => {
        if (game.config && game.config['config_id']) {
          this.partnersGame.push(game);
        }
      });
    });
  }


  // private updateListGameConfigs() {
  //   this.gameConfigsService.getGameConfigsList().subscribe((gameConfigs: GameConfig[]) => {
  //     this.gameConfigs = gameConfigs;
  //   });
  // }

  public openCreateGameConfig(createModal) {
    this.modalService.open(createModal).result.then(result => {
      this.gameConfigsService.showSuccessMessage('Game Config was successfully created');
    }, (reason) => {
      this.onCancel();
    });
  }

  public onCreate(newGameConfig: GameConfig, closeModal: Function) {
    const gameId = newGameConfig.game;
    delete newGameConfig.game;

    const config = {
      game_id: gameId,
      config: newGameConfig
    };

    this.gameConfigsService.createGameConfig(config).subscribe(respGameConfig => {
      this.updateGamePartners();
      closeModal();
    });
  }

  private onCancel() {
  }

  public openEditGameConfig(editOrDeleteModal, partnerGame) {
    this.gameConfigsService.getGameConfigDetail(partnerGame.config['config_id']).subscribe(gameConfig => {
      this.selectedGameConfig = gameConfig;
      this.modalService.open(editOrDeleteModal).result.then(isDelete => {
        if (!isDelete) {
          this.gameConfigsService.showSuccessMessage('Game Config was successfully updated');
        } else {
          this.gameConfigsService.showSuccessMessage('Game Config was successfully deleted');
        }
        this.selectedGameConfig = null;
      }, (reason) => {
        this.onCancelEdit();
      });
    });
  }

  onEdit(gameConfig: GameConfig, closeModal: Function) {
    this.gameConfigsService.updateGameConfigDetail(gameConfig).subscribe((respGameConfig: GameConfig) => {
      this.updateGamePartners();
      closeModal(false);
    });
  }

  onDelete(closeModal: Function) {
    this.gameConfigsService.deleteGameConfig(this.selectedGameConfig).subscribe(respDelete => {
      this.updateGamePartners();
      closeModal(true);
    });
  }

  onCancelEdit() {
  }
}
