import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameConfig } from '../../shared/models/game-config.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from '../../shared/models/form-field.model';
import { GamesService } from '../../shared/services/games.service';
import { PartnerGame } from '../../shared/models/partner-games.model';
import {WalletsService} from "../../shared/services/wallets.service";

@Component({
  selector: 'app-partner-config-game-interaction',
  templateUrl: './partner-config-game-interaction.component.html',
  styleUrls: ['./partner-config-game-interaction.component.scss']
})
export class PartnerConfigGameInteractionComponent implements OnInit {

  @Input() games: PartnerGame[] = [];
  @Input() creation: boolean = false;
  @Output() onSubmit: EventEmitter<PartnerGame> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  public customConfigs: any[] = [];
  public fieldsOptions: any;
  public options: any[] = [];
  public optionsCurrencies: any[] = [];
  private selectedGame: PartnerGame;
  public gameConfig: GameConfig;
  public gameConfigForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private walletService: WalletsService
  ) { }

  ngOnInit() {
    this.walletService.getCurrencies().subscribe((currencies: any[]) => {
      currencies.forEach(cur => {
        this.optionsCurrencies.push({id: cur, name:cur},);
      });
    });

    this.games.forEach((game, index) => {
      this.options.push({id: index, name: `${game.title}${game.config && game.config['config_id'] ? ' - ' + game.config['config_id'] : ''}`});
    });

    this.gameConfigForm = this.fb.group({
      game: ['', []]
    });

    this.gameConfigForm.get('game').valueChanges.subscribe(value => {
      if (this.games && this.games[+value]) {
        this.selectedGame = this.games[+value];
        this.gameConfig = this.creation ? new GameConfig() : this.games[+value].config;
        this.initForm();
      }
    });
  }

  initForm() {
    this.customConfigs = Object.keys(this.gameConfig.custom_config || {}).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.gameConfig.custom_config[configKey];
      return config;
    });
    this.fieldsOptions = [];
    setTimeout(() => this.fieldsOptions = [
        FormField.createFromObject({
          fieldName: 'currency',
          value: this.gameConfig.currency, validators: [],
          select: true, options: this.optionsCurrencies,
          label: 'Currency', placeholder: 'Enter currency'
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
    ], 0);
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm(value: any) {
    const customConfig = {};

    this.customConfigs.forEach(config => {
      customConfig[config['key']] = config['value'];
    });

    this.gameConfig.game  = this.selectedGame.game_id;
    this.gameConfig.currency  = value.currency;
    this.gameConfig.lobby_url  = value.lobby_url;
    this.gameConfig.min_bet  = value.min_bet;
    this.gameConfig.max_bet  = value.max_bet;
    this.gameConfig.custom_config  = customConfig;

    this.selectedGame.config = this.gameConfig;
    this.onSubmit.emit(this.selectedGame);
  }
}
