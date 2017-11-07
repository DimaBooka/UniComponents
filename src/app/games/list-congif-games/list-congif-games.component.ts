import { Component, OnInit } from '@angular/core';
import { GameConfig } from '../../shared/models/game-config.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-list-congif-games',
  templateUrl: './list-congif-games.component.html',
  styleUrls: ['./list-congif-games.component.scss']
})
export class ListCongifGamesComponent implements OnInit {

  public gameConfigs: GameConfig[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private gameConfigsService: GamesService
  ) { }

  ngOnInit() {
    // this.updateListGameConfigs();
  }

  private updateListGameConfigs() {
    this.gameConfigsService.getGameConfigsList().subscribe((gameConfigs: GameConfig[]) => {
      this.gameConfigs = gameConfigs;
    });
  }

  public openCreateGameConfig(createModal) {
    this.modalService.open(createModal).result.then((result: GameConfig) => {
      this.onCreate(result);
    }, (reason) => {
      this.onCancel();
    });
  }

  private onCreate(newGameConfig: GameConfig) {
    this.gameConfigsService.createGameConfig(newGameConfig).subscribe((respGameConfig: GameConfig) => {
      this.updateListGameConfigs();
    });
  }

  private onCancel() {

  }
}
