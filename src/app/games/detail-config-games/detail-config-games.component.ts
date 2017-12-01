import { Component, OnInit } from '@angular/core';
import { GameConfig } from '../../shared/models/game-config.model';
import { GamesService } from '../../shared/services/games.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-config-games',
  templateUrl: './detail-config-games.component.html',
  styleUrls: ['./detail-config-games.component.scss']
})
export class DetailConfigGamesComponent implements OnInit {

  public id: string;
  public gameConfig: GameConfig;
  public customConfigs: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.data.subscribe(trip => {
      this.gameConfig = <GameConfig>trip.detail;

      this.checkConfigs();
    });
  }

  checkConfigs() {
    this.customConfigs = Object.keys(this.gameConfig.custom_config).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.gameConfig.custom_config[configKey];
      return config;
    });
  }

  public openEditGameConfig(editOrDeleteModal) {
    this.modalService.open(editOrDeleteModal).result.then(isDelete => {
      if (!isDelete) {
        this.gamesService.showSuccessMessage('Game Config was successfully updated');
      } else {
        this.gamesService.showSuccessMessage('Game Config was successfully deleted');
      }
    }, (reason) => {
      this.onCancel();
    });
  }

  onEdit(gameConfig: GameConfig, closeModal: Function) {
    this.gamesService.updateGameConfigDetail(gameConfig).subscribe((respGameConfig: GameConfig) => {
      this.gameConfig = gameConfig;
      this.checkConfigs();
      closeModal(false);
    });
  }

  onDelete(closeModal: Function) {
    this.gamesService.deleteGameConfig(this.gameConfig).subscribe(respDelete => {
      closeModal(true);
      this.router.navigate(['/games/configs']);
    });
  }

  onCancel() {
  }
}
