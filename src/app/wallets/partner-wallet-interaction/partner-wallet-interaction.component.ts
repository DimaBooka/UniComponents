import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormField } from '../../shared/models/form-field.model';
import { PartnerWallet } from '../../shared/models/partner-wallet.model';

@Component({
  selector: 'app-partner-wallet-interaction',
  templateUrl: './partner-wallet-interaction.component.html',
  styleUrls: ['./partner-wallet-interaction.component.scss']
})
export class PartnerWalletInteractionComponent implements OnInit {

  @Input() partnerWallet: PartnerWallet = new PartnerWallet();
  @Input() creation: boolean = false;
  @Output() onSubmit: EventEmitter<PartnerWallet> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  public partnerWalletData: PartnerWallet;
  public customConfigs: any[] = [];
  public optionsType: any[] = [
    {id: 'super', name: 'super'},
    {id: 'mega', name: 'mega'},
  ];
  public fieldsOptions: any = {};

  constructor() {}

  ngOnInit() {
    this.partnerWalletData = PartnerWallet.createFromJSON(this.partnerWallet);

    this.customConfigs = Object.keys(this.partnerWallet.wallets).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.partnerWallet.wallets[configKey];
      return config;
    });

    this.fieldsOptions = [
      FormField.createFromObject({
        fieldName: 'available_wallets',
        value: this.partnerWallet.available_wallets, validators: [],
        select: true, label: 'Available Wallets',
        placeholder: 'Select Available Wallets'
      }),
      FormField.createFromObject({
        fieldName: 'Partner ID',
        value: this.partnerWallet.partner_id, validators: [],
        select: true, options: this.optionsType,
        label: 'Partner ID', placeholder: 'Select wallet type'
      }),
      FormField.createFromObject({
        fieldName: 'wallet_specials',
        value: this.customConfigs, validators: [], label: 'Wallet Specials'
      })
    ];
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm(value: any) {

    const customConfig = {};

    this.customConfigs.forEach(config => {
      customConfig[config['key']] = config['value'];
    });

    // this.partnerWalletData.wallet_url = value.wallet_url;
    // this.partnerWalletData.wallet_type = value.wallet_type;
    // this.partnerWalletData.wallet_specials = customConfig;

    this.onSubmit.emit(this.partnerWalletData);
  }
}
