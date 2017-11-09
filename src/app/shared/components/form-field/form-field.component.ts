import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() control: FormControl;
  @Input() type: string = 'text';
  @Input() input: boolean = false;
  @Input() select: boolean = false;
  @Input() textarea: boolean = false;
  @Input() multiple: boolean = false;
  @Input() options: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
