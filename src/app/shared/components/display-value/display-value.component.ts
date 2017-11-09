import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-value',
  templateUrl: './display-value.component.html',
  styleUrls: ['./display-value.component.scss']
})
export class DisplayValueComponent implements OnInit {

  @Input() label: string;
  @Input() value: string;
  @Input() multiple: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
