import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Partner } from '../../shared/models/partner.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-partner-interaction',
  templateUrl: './partner-interaction.component.html',
  styleUrls: ['./partner-interaction.component.scss']
})
export class PartnerInteractionComponent implements OnInit {

  @Input() partner: Partner = new Partner();
  @Input() creation: boolean = false;
  @Output() onSubmit: EventEmitter<Partner> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  public partnerForm: FormGroup;
  public optionsCurrencies: any[] = [];
  public optionsSites: any[] = [];
  public fieldsOptions: any = {};
  constructor(
    private fb: FormBuilder
  ) {
    this.optionsCurrencies = [
      {value: 'USD', name:'USD'},
      {value: 'EUR', name:'EUR'},
      {value: 'UAH', name:'UAH'}
    ];

    this.optionsSites = [
      {value: 'asasas.com', name: 'asasas.com'},
      {value: 'qwqwqw.com', name: 'qwqwqw.com'},
      {value: 'example.com', name: 'example.com'},
    ];
  }

  ngOnInit() {
    this.partnerForm = this.fb.group({
      email: [this.partner.email , []],
      password: [this.partner.password , []],
      token: [this.partner.token , []],
      available_currencies: [this.partner.available_currencies , []],
      sites: [this.partner.sites , []]
    });

    this.fieldsOptions = {
      email: {input: true, label: 'Email', placeholder: 'Enter email'},
      password: {input: true, label: 'Password', placeholder: 'Enter password'},
      token: {input: true, label: 'Token', placeholder: 'Enter token'},
      available_currencies: {select: true, options: this.optionsCurrencies, multiple: true, label: 'Available Currencies', placeholder: 'Enter available currencies'},
      sites: {select: true, options: this.optionsSites, multiple: true, label: 'Sites', placeholder: 'Enter sites'},
    };
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm(form?: FormGroup) {
    const value = form? form.value : this.partnerForm.value;

    this.partner.email = value.email;
    this.partner.password = value.password;
    this.partner.token = value.token;
    this.partner.available_currencies = value.available_currencies;
    this.partner.sites = value.sites;

    this.onSubmit.emit(this.partner);
  }

}
