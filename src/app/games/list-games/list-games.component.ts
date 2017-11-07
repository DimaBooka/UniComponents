import { Component, OnInit } from '@angular/core';
import { Game } from '../../shared/models/game.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss']
})
export class ListGamesComponent implements OnInit {

  public games: Game[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    // this.updateListPartners();
  }

  private updateListPartners() {
    this.gamesService.getGamesList().subscribe((partners: Game[]) => {
      this.games = partners;
    });
  }

  public openCreateGame(createModal) {
    this.modalService.open(createModal).result.then((result: Game) => {
      this.onCreate(result);
    }, (reason) => {
      this.onCancel();
    });
  }

  private onCreate(newGame: Game) {
    this.gamesService.createGame(newGame).subscribe((respGame: Game) => {
      this.updateListPartners();
    });
  }

  private onCancel() {

  }

}
