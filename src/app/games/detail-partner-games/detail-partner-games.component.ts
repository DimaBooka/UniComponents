import { Component, OnInit } from '@angular/core';
import { PartnerGames } from '../../shared/models/partner-games.model';
import { GamesService } from '../../shared/services/games.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-partner-games',
  templateUrl: './detail-partner-games.component.html',
  styleUrls: ['./detail-partner-games.component.scss']
})
export class DetailPartnerGamesComponent implements OnInit {

  public id: string;
  public partnerGame: PartnerGames;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.data.subscribe(trip => {
      this.partnerGame = <PartnerGames>trip.detail;
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

  onEdit(partnerGame: PartnerGames, closeModal: Function) {
    this.gamesService.updateGamePartnerDetail(partnerGame, this.id).subscribe(respGameId => {
      this.partnerGame = partnerGame;
      closeModal(false);
    });
  }

  onCancel() {
  }
}
