import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Game } from '../../shared/models/game.model';

@Component({
  selector: 'app-game-interaction',
  templateUrl: './game-interaction.component.html',
  styleUrls: ['./game-interaction.component.scss']
})
export class GameInteractionComponent implements OnInit {

  @Input() game: Game = new Game();
  @Input() creation: boolean = false;
  @Output() onSubmit: EventEmitter<Game> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  public gameForm: FormGroup;

  public customConfigs: any[] = [];
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.gameForm = this.fb.group({
      title: [this.game.title , []],
      description: [this.game.description , []],
      picture_url: [this.game.picture_url , []],
      game_url: [this.game.game_url , []],
      secret_key: [this.game.secret_key , []]
    });

    this.customConfigs = Object.keys(this.game.default_custom_config).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.game.default_custom_config[configKey];
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
    if (event['key'] && event['value'] && this.customConfigs[event['index']]) {
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
    const value = this.gameForm.value;

    const customConfig = {};

    this.customConfigs.forEach(config => {
      customConfig[config['key']] = config['value'];
    });

    this.game.title = value.title;
    this.game.description = value.description;
    this.game.picture_url = value.picture_url;
    this.game.game_url = value.game_url;
    this.game.secret_key = value.secret_key;
    this.game.default_custom_config = customConfig;

    this.onSubmit.emit(this.game);
  }
}
