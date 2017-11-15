import { Component, OnInit } from '@angular/core';
import { PartnerGame } from '../../shared/models/partner-games.model';
import { GamesService } from '../../shared/services/games.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../shared/models/game.model';

@Component({
  selector: 'app-detail-partner-games',
  templateUrl: './detail-partner-games.component.html',
  styleUrls: ['./detail-partner-games.component.scss']
})
export class DetailPartnerGamesComponent implements OnInit {

  public id: string;
  public partnerGames: PartnerGame[];
  public partnerGamesTitle: string[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.data.subscribe(trip => {
      this.partnerGames = <PartnerGame[]>trip.detail;
      this.partnerGamesTitle = this.partnerGames.map(game => game.title);
    });
  }

  updatepartnerGamesList() {
    this.gamesService.getGamePartnerDetail(this.id).subscribe(games => {
      this.partnerGames = games;
      this.partnerGamesTitle = this.partnerGames.map(game => game.title);
    });
  }

  public openEditPartnerGame(editOrDeleteModal) {
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

  onEdit(newPartnerGames: string[], closeModal: Function) {
    this.gamesService.updateGamePartnerDetail(newPartnerGames, this.id).subscribe(respGameId => {
      this.updatepartnerGamesList();
      closeModal(false);
    });
  }

  onCancel() {
  }
}
