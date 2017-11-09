import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {

  @Input() type: string = 'button';
  @Input() value: string = 'Save';
  @Input() primary: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onClickEvent(event) {
    this.onClick.emit(event);
  }

}
