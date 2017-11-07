import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-config-game',
  templateUrl: './custom-config-game.component.html',
  styleUrls: ['./custom-config-game.component.scss']
})
export class CustomConfigGameComponent implements OnInit {

  @Input() index: number = 0;
  @Input() key: string = "";
  @Input() value: string = "";
  @Input() isLabel: boolean = false;
  @Input() showRemove: boolean = false;
  @Input() isInput: boolean = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onChangeData() {
    this.onChange.emit({
      index: this.index,
      key: this.key,
      value: this.value
    });
  }

  removeData() {
    this.onRemove.emit(this.index);
  }
}
