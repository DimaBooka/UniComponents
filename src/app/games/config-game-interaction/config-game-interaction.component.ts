import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameConfig } from '../../shared/models/game-config.model';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  public gameConfigForm: FormGroup;

  public customConfigs: any[] = [];
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.gameConfigForm = this.fb.group({
      game: [this.gameConfig.game, []],
      currency: [this.gameConfig.currency, []],
      lobby_url: [this.gameConfig.lobby_url, []],
      min_bet: [this.gameConfig.min_bet, []],
      max_bet: [this.gameConfig.max_bet, []],
      custom_config: [this.gameConfig.custom_config, []]
    });

    this.customConfigs = Object.keys(this.gameConfig.custom_config).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.gameConfig.custom_config[configKey];
      return config;
    });
  }

  addCustomConfig() {
    let canAdd: boolean = true;
    for (let config in this.customConfigs) {
      if (this.customConfigs[config]['key'].length === 0 && this.customConfigs[config]['value'].length === 0) {
        canAdd = false;
        break;
      }
    }

    if (canAdd) {
      this.customConfigs.push({ key: "", value: "" });
    }
  }

  onChangeConfig(event) {
    if (event['index'] && event['key'] && event['value'] && this.customConfigs[event['index']]) {
      this.customConfigs[event['index']]['key'] = event['key'];
      this.customConfigs[event['index']]['value'] = event['value'];
    }
  }

  onRemoveConfig(index) {
    if (this.customConfigs[index]) {
      this.customConfigs.splice(index, 1);
    }
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm() {
    const value = this.gameConfigForm.value;

    const customConfig = {};

    this.customConfigs.forEach(config => {
      customConfig[config['key']] = config['value'];
    });

    this.gameConfig.game  = value.game;
    this.gameConfig.currency  = value.currency;
    this.gameConfig.lobby_url  = value.lobby_url;
    this.gameConfig.min_bet  = value.min_bet;
    this.gameConfig.max_bet  = value.max_bet;
    this.gameConfig.custom_config  = customConfig;

    this.onSubmit.emit(this.gameConfig);
  }
}
