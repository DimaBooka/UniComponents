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
  public partnerData: Partner;
  public optionsCurrencies: any[] = [];
  public optionsSites: any[] = [];
  public fieldsOptions: any = {};
  constructor(
    private fb: FormBuilder
  ) {
    this.optionsCurrencies = [
      {id: 'USD', name:'USD'},
      {id: 'EUR', name:'EUR'},
      {id: 'UAH', name:'UAH'}
    ];

    this.optionsSites = [
      {id: 'asasas.com', name: 'asasas.com'},
      {id: 'qwqwqw.com', name: 'qwqwqw.com'},
      {id: 'example.com', name: 'example.com'},
    ];
  }

  ngOnInit() {
    this.partnerData = Partner.createFromJSON(this.partner);
    this.partnerForm = this.fb.group({
      email: [this.partner.email , []],
      password: ['' , []],
      token: [this.partner.token , []],
      available_currencies: [[...this.partner.available_currencies] , []],
      sites: [[...this.partner.sites] , []]
    });

    this.fieldsOptions = {
      email: {input: true, label: 'Email', placeholder: 'Enter email'},
      password: {input: true, type: 'password', label: this.creation ? 'Password' : 'Change Password', placeholder: this.creation ? 'Enter password' : 'Enter new password'},
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

    this.partnerData.email = value.email;
    this.partnerData.password = value.password;
    this.partnerData.token = value.token;
    this.partnerData.available_currencies = value.available_currencies;
    this.partnerData.sites = value.sites;

    this.onSubmit.emit(this.partnerData);
  }

}
