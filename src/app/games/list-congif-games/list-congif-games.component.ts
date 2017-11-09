import { Component, OnInit } from '@angular/core';
import { GameConfig } from '../../shared/models/game-config.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../shared/services/games.service';
import { ToasterService } from 'angular2-toaster';

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
    private gameConfigsService: GamesService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.updateListGameConfigs();
  }

  private updateListGameConfigs() {
    this.gameConfigsService.getGameConfigsList().subscribe((gameConfigs: GameConfig[]) => {
      this.gameConfigs = gameConfigs;
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
      this.updateListGameConfigs();
      closeModal();
    });
  }

  private onCancel() {
  }
}
