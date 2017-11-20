import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormField } from '../../shared/models/form-field.model';
import { Wallet } from "../../shared/models/wallet.model";
import {WalletsService} from "../../shared/services/wallets.service";

@Component({
  selector: 'app-wallet-interaction',
  templateUrl: './wallet-interaction.component.html',
  styleUrls: ['./wallet-interaction.component.scss']
})
export class WalletInteractionComponent implements OnInit {

  @Input() wallet: Wallet = new Wallet();
  @Input() creation: boolean = false;
  @Output() onSubmit: EventEmitter<Wallet> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  public walletData: Wallet;
  public customConfigs: any[] = [];
  public optionsType: any[] = [];
  public fieldsOptions: any;

  constructor(private walletService: WalletsService) {}

  ngOnInit() {
    this.walletService.getWalletTypes().subscribe((types: any[]) => {
      types.forEach(type => this.optionsType.push({id: type, name: type}));
      this.init();
    });
  }

  init() {
    this.walletData = Wallet.createFromJSON(this.wallet);

    this.customConfigs = Object.keys(this.wallet.wallet_specials).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.wallet.wallet_specials[configKey];
      return config;
    });

    this.fieldsOptions = [
      FormField.createFromObject({
        fieldName: 'wallet_url',
        value: this.wallet.wallet_url, validators: [],
        input: true, label: 'Wallet URL',
        placeholder: 'Enter wallet url'
      }),
      FormField.createFromObject({
        fieldName: 'wallet_type',
        value: this.wallet.wallet_type, validators: [],
        select: true, options: this.optionsType,
        label: 'Wallet Type', placeholder: 'Select wallet type'
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

    this.walletData.wallet_url = value.wallet_url;
    this.walletData.wallet_type = value.wallet_type;
    this.walletData.wallet_specials = customConfig;

    this.onSubmit.emit(this.walletData);
  }

}
