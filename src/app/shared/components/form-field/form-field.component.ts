import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [ NgbTimepickerConfig ]
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
  public settings = {
    buttonClasses: 'form-control form-control-multiselect',
    containerClasses: 'form-group form-group-multiselect w-100'
  };
  constructor(config: NgbTimepickerConfig) {
    config.seconds = true;
    config.spinners = false;
  }

  ngOnInit() {
  }
}
