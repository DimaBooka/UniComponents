import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameConfig } from '../../shared/models/game-config.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from '../../shared/models/form-field.model';
import { GamesService } from '../../shared/services/games.service';
import { PartnerGame } from '../../shared/models/partner-games.model';

@Component({
  selector: 'app-config-game-interaction',
  templateUrl: './config-game-interaction.component.html',
  styleUrls: ['./config-game-interaction.component.scss']
})
export class ConfigGameInteractionComponent implements OnInit {

  @Input() gameConfig: GameConfig = new GameConfig();
  @Input() creation: boolean = false;
  @Output() onSubmit: EventEmitter<GameConfig> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  public customConfigs: any[] = [];
  public fieldsOptions: any;
  public options: any[] = [];
  public games: PartnerGame[];
  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.gamesService.getGamePartnersList().subscribe(games => {
      this.games = games;
      this.initForm();
    });
  }

  initForm() {

    this.customConfigs = Object.keys(this.gameConfig.custom_config).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.gameConfig.custom_config[configKey];
      return config;
    });

    this.games.forEach(game => {
      this.options.push({id: game.game_id, name: game.title});
    });

    this.fieldsOptions = [
      FormField.createFromObject({
        fieldName: 'game',
        value: this.gameConfig.game, validators: [],
        select: true, options: this.options, label: 'Game ID', placeholder: 'Enter game id'
      }),
      FormField.createFromObject({
        fieldName: 'currency',
        value: this.gameConfig.currency, validators: [],
        input: true, label: 'Currency', placeholder: 'Enter currency'
      }),
      FormField.createFromObject({
        fieldName: 'lobby_url',
        value: this.gameConfig.lobby_url, validators: [],
        input: true, label: 'Lobby URL', placeholder: 'Enter lobby url'
      }),
      FormField.createFromObject({
        fieldName: 'min_bet',
        value: this.gameConfig.min_bet, validators: [],
        input: true, type: 'number', label: 'Min Bet', placeholder: 'Enter min bet'
      }),
      FormField.createFromObject({
        fieldName: 'max_bet',
        value: this.gameConfig.max_bet, validators: [],
        input: true, type: 'number', label: 'Max Bet', placeholder: 'Enter max bet'
      }),
      FormField.createFromObject({
        fieldName: 'custom_config',
        value: this.customConfigs, validators: [], label: 'Custom Config'
      })
    ];
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm(value: any) {
    const customConfig = {};

    this.customConfigs.forEach(config => {
      customConfig[config['key']] = config['value'];
    });

    debugger;
    this.gameConfig.game  = value.game;
    this.gameConfig.currency  = value.currency;
    this.gameConfig.lobby_url  = value.lobby_url;
    this.gameConfig.min_bet  = value.min_bet;
    this.gameConfig.max_bet  = value.max_bet;
    this.gameConfig.custom_config  = customConfig;

    this.onSubmit.emit(this.gameConfig);
  }
}
