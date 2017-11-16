import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from "../../models/form-field.model";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() fieldsOptions: FormField[] = [];
  @Input() creation: boolean = false;
  @Output() changedForm: EventEmitter<FormGroup> = new EventEmitter();
  @Output() cancelForm: EventEmitter<any> = new EventEmitter();
  public formEntity: FormGroup;
  public customConfigField: FormField;
  public customConfigs: any[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const formData = {};
    this.fieldsOptions.forEach(field => {
      formData[field.fieldName] = [ field.value, field.validators ]
    });
    this.formEntity = this.fb.group(formData);

    const customField: FormField[] = this.fieldsOptions
      .filter(field => ['default_custom_config', 'custom_config', 'config', 'wallet_specials'].indexOf(field.fieldName) > -1);
    if (customField.length === 1) {
      this.customConfigField = customField[0];
      this.customConfigs = this.customConfigField.value;
      this.fieldsOptions.splice(this.fieldsOptions.indexOf(this.customConfigField), 1);
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

      this.formEntity.get(this.customConfigField.fieldName).setValue(customConfig);
      this.formEntity.updateValueAndValidity();
    }

    this.changedForm.emit(this.formEntity.value);
  }

}
