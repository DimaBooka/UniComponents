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
  private gameForm: FormGroup;
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
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm() {
    const value = this.gameForm.value;

    this.game.title = value.title;
    this.game.description = value.description;
    this.game.picture_url = value.picture_url;
    this.game.game_url = value.game_url;
    this.game.secret_key = value.secret_key;

    this.onSubmit.emit(this.game);
  }
}
