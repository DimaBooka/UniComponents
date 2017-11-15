import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PartnerGame } from '../../shared/models/partner-games.model';
import { FormField } from '../../shared/models/form-field.model';
import { Game } from '../../shared/models/game.model';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-partner-game-interaction',
  templateUrl: './partner-game-interaction.component.html',
  styleUrls: ['./partner-game-interaction.component.scss']
})
export class PartnerGameInteractionComponent implements OnInit {

  @Input() partnerGames: PartnerGame[] = [];
  @Input() creation: boolean = false;
  @Output() onSubmit: EventEmitter<PartnerGame> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  public partnerGamesData: PartnerGame;
  public fieldsOptions: FormField[];
  public gamesOptions: any[] = [];
  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.partnerGamesData = PartnerGame.createFromJSON(this.partnerGames);
    this.getListGames();
  }

  private getListGames() {
    this.gamesService.getGamesList().subscribe((games: Game[]) => {
      let selectedGames = this.partnerGames.map(game => game.game_id);

      this.gamesOptions = [];
      games.forEach(game => {
        if (selectedGames.indexOf(game.id) < 0) {
          this.gamesOptions.push({ id: game.id, name: game.title });
        }
      });

      this.fieldsOptions = [
        FormField.createFromObject({
          fieldName: 'games',
          value: [], validators: [],
          select: true, multiple: true, options: this.gamesOptions, label: 'Add Games'
        })
      ];
    });
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm(value: any) {

    this.onSubmit.emit(value.games);
  }
}
