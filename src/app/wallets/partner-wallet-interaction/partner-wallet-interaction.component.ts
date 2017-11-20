import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormField } from '../../shared/models/form-field.model';
import { PartnerWallet } from '../../shared/models/partner-wallet.model';
import { WalletsService } from '../../shared/services/wallets.service';
import { Wallet } from '../../shared/models/wallet.model';

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

  public wallet: any;
  public currency: any;
  public availableWallets: any[] = [];
  public allWallets: any[] = [];
  public allCurrencies: any[] = [];

  public optionsWallets: any[] = [];
  public optionsAvailableWallets: any[] = [];
  public optionsCurrencies: any[] = [];
  public fieldsOptions: any;
  constructor(
    private walletsService: WalletsService
  ) {}

  ngOnInit() {

    this.partnerWallet.available_wallets.forEach(id => {
      this.allWallets.push({id: id, name: id});
      this.optionsWallets.push({id: id, name: id});
    });

    this.walletsService.getCurrencies().subscribe((currencies: any[]) => {
      currencies.forEach(cur => {
        this.allCurrencies.push({id: cur, name: cur},);
      });

      this.init();
    });
  }

  formatOptions(walletsObject?) {
    if (!walletsObject) {
      walletsObject = {};

      this.customConfigs.forEach(config => {
        walletsObject[config['key']] = config['value'];
      });
    }

    let currenciesInUse = Object.keys(walletsObject);
    let walletsInUse = Object.keys(walletsObject).map(cur => walletsObject[cur]);

    this.optionsAvailableWallets = [];
    this.allWallets.forEach(wallet => {
      if (walletsInUse.indexOf(wallet.name) < 0
        && this.availableWallets.indexOf(wallet.id) > -1)
      this.optionsAvailableWallets.push(wallet);
    });

    this.optionsCurrencies = [];
    this.allCurrencies.forEach(cur => {
      if (currenciesInUse.indexOf(cur.name) < 0)
        this.optionsCurrencies.push(cur);
    });
  }

  init() {
    this.partnerWalletData = PartnerWallet.createFromJSON(this.partnerWallet);
    this.availableWallets = this.partnerWallet.available_wallets;
    this.formatOptions(this.partnerWallet.wallets);

    this.customConfigs = Object.keys(this.partnerWallet.wallets).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.partnerWallet.wallets[configKey];
      return config;
    });

    this.fieldsOptions = [];
  }

  onSelectAvailable(values) {
    if (values['available_wallets']) {
      this.availableWallets = values['available_wallets'];

      let indexes: number[] = [];
      this.customConfigs.forEach((item, index) => {
        if (this.availableWallets.indexOf(item.value) < 0) {
          indexes.push(index);
        }
      });

      for (let i in indexes) {
        this.customConfigs.splice(indexes[i], 1);
      }
      this.formatOptions();
    }
  }

  addCurWal() {
    if (this.wallet && this.currency) {
      const objToAdd = {};
      objToAdd['key'] = this.currency;
      objToAdd['value'] = this.wallet;
      this.customConfigs.push(objToAdd);

      this.currency = '';
      this.wallet = '';
      this.formatOptions();
    }
  }

  onRemoveConfig(index) {
    if (this.customConfigs[index]) {
      this.customConfigs.splice(index, 1);
      this.formatOptions();
    }
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm(value: any) {

    const customConfig = {};
    this.customConfigs.forEach(config => {
      customConfig[config['key']] = config['value'];
    });
    this.partnerWalletData.wallets = customConfig;

    this.onSubmit.emit(this.partnerWalletData);
  }
}
