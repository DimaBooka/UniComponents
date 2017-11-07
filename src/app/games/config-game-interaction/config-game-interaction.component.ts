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
  private gameConfigForm: FormGroup;
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
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm() {
    const value = this.gameConfigForm.value;

    this.gameConfig.game  = value.game;
    this.gameConfig.currency  = value.currency;
    this.gameConfig.lobby_url  = value.lobby_url;
    this.gameConfig.min_bet  = value.min_bet;
    this.gameConfig.max_bet  = value.max_bet;
    this.gameConfig.custom_config  = value.custom_config;

    this.onSubmit.emit(this.gameConfig);
  }
}
