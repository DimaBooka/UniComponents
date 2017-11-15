import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../../shared/services/games.service';
import { PartnerGame } from '../../shared/models/partner-games.model';

@Component({
  selector: 'app-detail-game-partner-games',
  templateUrl: './detail-game-partner-games.component.html',
  styleUrls: ['./detail-game-partner-games.component.scss']
})
export class DetailGamePartnerGamesComponent implements OnInit {

  public id: string;
  public game: PartnerGame;
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
      this.game = <PartnerGame>(trip.detail.filter(game => {
        return game.game_id === this.id
      })[0]);
      this.checkCustomConfigs();
    });
  }

  private checkCustomConfigs() {
    this.customConfigs = Object.keys(this.game.config).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.game.config[configKey];
      return config;
    });
  }
}
