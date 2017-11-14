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
    this.updateListGames();
  }

  private updateListGames() {
    this.gamesService.getGamesList().subscribe((games: Game[]) => {
      this.games = games;
    });
  }

  public openCreateGame(createModal) {
    this.modalService.open(createModal).result.then(result => {
      this.gamesService.showSuccessMessage('Game was successfully added');
    }, (reason) => {
      this.onCancel();
    });
  }

  public onCreate(newGame: Game, closeModal: Function) {
    this.gamesService.createGame(newGame).subscribe(respGame => {
      this.updateListGames();
      closeModal();
    });
  }

  private onCancel() {

  }

}
