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
    });
  }

  public openEditGame(editOrDeleteModal, isDelete) {
    this.modalService.open(editOrDeleteModal).result.then((result: Game) => {
      if (!isDelete) {
        this.onEdit(result);
      } else {
        this.onDelete();
      }
    }, (reason) => {
      this.onCancel();
    });
  }

  onEdit(game: Game) {
    debugger;

    this.gamesService.updateGameDetail(game).subscribe((respGame: Game) => {
      this.game = respGame;
    });
  }

  onDelete() {
    debugger;
  }

  onCancel() {
  }
}
