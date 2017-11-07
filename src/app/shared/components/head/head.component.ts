import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  @Input() title: string;
  @Input() link: string;
  @Input() subtitle: string;
  constructor() { }

  ngOnInit() {
  }

}
