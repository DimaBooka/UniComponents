import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Partner } from '../../shared/models/partner.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from '../../shared/models/form-field.model';
import {WalletsService} from "../../shared/services/wallets.service";
import {ToasterService} from "angular2-toaster";

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
  public partnerData: Partner;
  public optionsCurrencies: any[] = [];
  public optionsSites: any[] = [
    {id: 'asasas.com', name: 'asasas.com'},
    {id: 'qwqwqw.com', name: 'qwqwqw.com'},
    {id: 'example.com', name: 'example.com'},
  ];
  public fieldsOptions: any;
  public sites: string[] = [];
  public site: string = '';
  constructor(
    private walletService: WalletsService,
    private toastService: ToasterService
  ) {}

  ngOnInit() {
    this.walletService.getCurrencies().subscribe((currencies: any[]) => {
      currencies.forEach(cur => {
        this.optionsCurrencies.push({id: cur, name:cur},);
      });

      this.init();
    });
  }

  init() {
    this.partnerData = Partner.createFromJSON(this.partner);

    this.fieldsOptions = [
      FormField.createFromObject({
        fieldName: 'email',
        value: this.partner.email, validators: [],
        input: true, label: 'Email', placeholder: 'Enter email'
      }),
      FormField.createFromObject({
        fieldName: 'password',
        value: '', validators: [],
        input: true, type: 'password',
        label: this.creation ? 'Password' : 'Change Password',
        placeholder: this.creation ? 'Enter password' : 'Enter new password'
      }),
      FormField.createFromObject({
        fieldName: 'token',
        value: this.partner.token, validators: [],
        input: true, label: 'Token', placeholder: 'Enter token'
      }),
      FormField.createFromObject({
        fieldName: 'available_currencies',
        value: [...this.partner.available_currencies], validators: [],
        select: true, options: this.optionsCurrencies, multiple: true,
        label: 'Available Currencies', placeholder: 'Enter available currencies'
      }),
      // FormField.createFromObject({
      //   fieldName: 'sites',
      //   value: [...this.partner.sites], validators: [],
      //   input: true, label: 'Sites', placeholder: 'Enter sites'
      // })
    ];

    this.sites = [...this.partner.sites];
  }

  removeSite(index: number) {
    this.sites.splice(index, 1);
  }

  addSite() {
    if (this.site) {
      if (this.site.indexOf('.') > -1) {
        this.sites.push(this.site);
        this.site = '';
      } else {
        this.toastService.pop('error', 'Site URL is incorrect.');
      }
    }
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm(value: any) {

    this.partnerData.email = value.email;
    this.partnerData.password = value.password;
    this.partnerData.token = value.token;
    this.partnerData.available_currencies = value.available_currencies;
    this.partnerData.sites = this.sites;

    this.onSubmit.emit(this.partnerData);
  }

}
