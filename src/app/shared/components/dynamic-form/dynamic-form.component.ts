import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() formEntity: FormGroup;
  @Input() fieldsOptions: any = {};
  @Input() creation: boolean = false;
  @Output() changedForm: EventEmitter<FormGroup> = new EventEmitter();
  @Output() cancelForm: EventEmitter<any> = new EventEmitter();
  public fields: any[] = [];
  public customConfigField: string = null;
  public customConfigs: any[] = [];
  constructor() { }

  ngOnInit() {
    this.fields = Object.keys(this.fieldsOptions);
    this.customConfigField = this.fields.indexOf('default_custom_config') > -1 ?
      'default_custom_config' : this.fields.indexOf('custom_config') > -1 ? 'custom_config' : null;

    if (this.customConfigField) {
      this.customConfigs = this.fieldsOptions[this.customConfigField]['values'];
      this.fields.splice(this.fields.indexOf(this.customConfigField), 1);
    }
  }

  addCustomConfig() {
    let canAdd: boolean = true;
    for (let config in this.customConfigs) {
      if (this.customConfigs[config]['key'].length === 0 && this.customConfigs[config]['value'].length === 0) {
        canAdd = false;
        break;
      }
    }

    if (canAdd) {
      this.customConfigs.push({ key: "", value: "" });
    }
  }

  onChangeConfig(event) {
    if (event['key'] && event['value'] && this.customConfigs[event['index']]) {
      this.customConfigs[event['index']]['key'] = event['key'];
      this.customConfigs[event['index']]['value'] = event['value'];
    }
  }

  onRemoveConfig(index) {
    if (this.customConfigs[index]) {
      this.customConfigs.splice(index, 1);
    }
  }

  onCancelForm() {
    this.cancelForm.emit();
  }

  onSubmitForm() {

    if (this.customConfigField) {
      const customConfig = {};

      this.customConfigs.forEach(config => {
        customConfig[config['key']] = config['value'];
      });

      this.formEntity.get(this.customConfigField).setValue(customConfig);
      this.formEntity.updateValueAndValidity();
    }

    this.changedForm.emit(this.formEntity);
  }

}
