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
  public fieldsOptions: any = {};
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
      secret_key: [this.game.secret_key , []],
      default_custom_config: [this.game.default_custom_config , []]
    });

    this.customConfigs = Object.keys(this.game.default_custom_config).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.game.default_custom_config[configKey];
      return config;
    });

    this.fieldsOptions = {
      title: {input: true, label: 'Title', placeholder: 'Enter title'},
      description: {textarea: true, label: 'Description', placeholder: 'Enter description'},
      picture_url: {input: true, label: 'Picture URL', placeholder: 'Enter picture url'},
      game_url: {input: true, label: 'Game URL', placeholder: 'Enter game url'},
      secret_key: {input: true, label: 'Secret Key', placeholder: 'Enter secret key'},
      default_custom_config: {values: this.customConfigs},
    }
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm(form?: FormGroup) {
    const value = form ? form.value : this.gameForm.value;

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
