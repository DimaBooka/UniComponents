import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Game } from '../../shared/models/game.model';
import { FormField } from '../../shared/models/form-field.model';

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
  public gameData: Game;
  public fieldsOptions: FormField[] = [];
  public customConfigs: any[] = [];
  constructor() { }

  ngOnInit() {
    this.gameData = Game.createFromJSON(this.game);

    this.customConfigs = Object.keys(this.game.default_custom_config).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.game.default_custom_config[configKey];
      return config;
    });

    this.fieldsOptions = [
      FormField.createFromObject({
        fieldName: 'title',
        value: this.game.title, validators: [],
        input: true, label: 'Title', placeholder: 'Enter title'
      }),
      FormField.createFromObject({
        fieldName: 'description',
        value: this.game.description, validators: [],
        textarea: true, label: 'Description', placeholder: 'Enter description'
      }),
      FormField.createFromObject({
        fieldName: 'picture_url',
        value: this.game.picture_url, validators: [],
        input: true, label: 'Picture URL', placeholder: 'Enter picture url'
      }),
      FormField.createFromObject({
        fieldName: 'game_url',
        value: this.game.game_url, validators: [],
        input: true, label: 'Game URL', placeholder: 'Enter game url'
      }),
      FormField.createFromObject({
        fieldName: 'secret_key',
        value: this.game.secret_key, validators: [],
        input: true, label: 'Secret Key', placeholder: 'Enter secret key'
      }),
      FormField.createFromObject({
        fieldName: 'default_custom_config',
        value: this.customConfigs, validators: [], label: 'Default Custom Config'
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

    this.gameData.title = value.title;
    this.gameData.description = value.description;
    this.gameData.picture_url = value.picture_url;
    this.gameData.game_url = value.game_url;
    this.gameData.secret_key = value.secret_key;
    this.gameData.default_custom_config = customConfig;

    this.onSubmit.emit(this.gameData);
  }
}
