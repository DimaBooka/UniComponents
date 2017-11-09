import { Component, OnInit } from '@angular/core';
import { Game } from '../../shared/models/game.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-detail-games',
  templateUrl: './detail-games.component.html',
  styleUrls: ['./detail-games.component.scss']
})
export class DetailGamesComponent implements OnInit {

  public id: string;
  public game: Game;
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
      this.game = <Game>trip.detail;

      this.customConfigs = Object.keys(this.game.default_custom_config).map(configKey => {
        const config = {};
        config['key'] = configKey;
        config['value'] = this.game.default_custom_config[configKey];
        return config;
      });
    });
  }

  public openEditGame(editOrDeleteModal) {
    this.modalService.open(editOrDeleteModal).result.then(isDelete => {
      if (!isDelete) {
        this.gamesService.showSuccessMessage('Game was successfully updated');
      } else {
        this.gamesService.showSuccessMessage('Game was successfully deleted');
      }
    }, (reason) => {
      this.onCancel();
    });
  }

  onEdit(game: Game, closeModal: Function) {
    debugger;

    this.gamesService.updateGameDetail(game).subscribe((respGame: Game) => {
      this.game = respGame;
      closeModal(false);
    });
  }

  onDelete(closeModal: Function) {
    this.gamesService.deleteGame(this.game).subscribe(respDelete => {
      closeModal(true);
      this.router.navigate(['/games']);
    });
  }

  onCancel() {
  }
}
