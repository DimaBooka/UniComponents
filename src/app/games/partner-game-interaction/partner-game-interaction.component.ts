import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PartnerGames } from '../../shared/models/partner-games.model';
import { FormField } from '../../shared/models/form-field.model';
import { Game } from '../../shared/models/game.model';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-partner-game-interaction',
  templateUrl: './partner-game-interaction.component.html',
  styleUrls: ['./partner-game-interaction.component.scss']
})
export class PartnerGameInteractionComponent implements OnInit {

  @Input() partnerGame: PartnerGames = new PartnerGames();
  @Input() creation: boolean = false;
  @Output() onSubmit: EventEmitter<PartnerGames> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  public partnerGamesData: PartnerGames;
  public fieldsOptions: FormField[];
  public gamesOptions: any[] = [];
  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.partnerGamesData = PartnerGames.createFromJSON(this.partnerGame);
    this.getListGames();
  }

  private getListGames() {
    this.gamesService.getGamesList().subscribe((games: Game[]) => {
      this.gamesOptions = games.map(game => {
        return { id: game.id, name: game.title }
      });

      this.fieldsOptions = [
        FormField.createFromObject({
          fieldName: 'games',
          value: this.partnerGame.games, validators: [],
          select: true, multiple: true, options: this.gamesOptions, label: 'Games'
        })
      ];
    });
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm(value: any) {

    this.partnerGamesData.games = value.games;

    this.onSubmit.emit(this.partnerGamesData);
  }
}
