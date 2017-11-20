import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import {CURRENCIES, PARTNER_WALLETS, WALLET_TYPES, WALLETS} from '../constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { ToasterService } from "angular2-toaster/src/toaster.service";
import { ErrorService } from './error.service';
import { Wallet } from '../models/wallet.model';
import { PartnerWallet } from "../models/partner-wallet.model";

@Injectable()
export class WalletsService {

  constructor(
    private http: Http,
    private router: Router,
    private toasterService: ToasterService,
    private errorService: ErrorService
  ) {
  }

  showSuccessMessage(message: string) {
    this.toasterService.pop('success', message);
  };

  getCurrencies() {
    return this.http.get(CURRENCIES).map(resp => resp.json()['currencies']);
  }

  getWalletTypes() {
    return this.http.get(WALLET_TYPES).map(resp => resp.json()['wallet_types']);
  }

  // CRUD for Wallet entity

  getWalletsList() {
    return this.http.get(WALLETS)
      .map(resp => {
        const respData: any[] = resp.json();
        const wallets: Wallet[] = [];
        if (respData['wallets'] && respData['wallets'].length > 0) {
          respData['wallets'].forEach(wallet => {
            wallets.push(Wallet.createFromJSON(wallet));
          });
        }

        return wallets;
      })
      .catch(this.errorService.showErrorHandler());
  }

  getWalletDetail(id: string) {
    return this.http.get(`${WALLETS}/${id}`)
      .map(resp => {
        const respData: any = resp.json();
        return Wallet.createFromJSON(respData['wallet']);
      })
      .catch(this.errorService.showErrorHandler());
  }

  createWallet(wallet: Wallet) {
    const walletData = {...wallet};
    delete walletData.id;
    return this.http.post(WALLETS, walletData)
      .map(resp => {
        return resp.json();
      })
      .catch(this.errorService.showErrorHandler());
  }

  updateWalletDetail(wallet: Wallet) {
    const walletData = {...wallet};
    delete walletData.id;
    return this.http.put(`${WALLETS}/${wallet.id}`, walletData)
      .map(resp => {
        return resp.json();
      })
      .catch(this.errorService.showErrorHandler());
  }

  deleteWallet(wallet: Wallet) {
    return this.http.delete(`${WALLETS}/${wallet.id}`)
      .map(resp => resp.json())
      .catch(this.errorService.showErrorHandler());
  }


  // CRUD for PartnerWallet entity

  getPartnerWalletsList(noArray: boolean = false) {
    return this.http.get(PARTNER_WALLETS)
      .map(resp => {
        const respData: any[] = resp.json();
        const partnerWallets: PartnerWallet[] = [];
        if (respData['partner_wallets'] && respData['partner_wallets'].length > 0) {
          respData['partner_wallets'].forEach(partnerWallet => {
            partnerWallets.push(PartnerWallet.createFromJSON(partnerWallet));
          });
        }
        return partnerWallets;
      })
      .catch(this.errorService.showErrorHandler());
  }

  getPartnerWalletDetail(id?: string) {
    return this.http.get(id ? `${PARTNER_WALLETS}/${id}` : PARTNER_WALLETS)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerWallet.createFromJSON(respData['partner_wallets']);
      })
      .catch(this.errorService.showErrorHandler());
  }

  createPartnerWallet(partnerWallet: PartnerWallet) {
    const partnerWalletData = {...partnerWallet};
    delete partnerWalletData.id;
    return this.http.post(PARTNER_WALLETS, partnerWalletData)
      .map(resp => {
        return resp.json();
      })
      .catch(this.errorService.showErrorHandler());
  }

  updatePartnerWalletDetail(partnerWallet: PartnerWallet, create: boolean) {
    const partnerWalletData = {...partnerWallet};
    delete partnerWalletData.id;

    if (create) {
      return this.http.post(`${PARTNER_WALLETS}/${partnerWallet.partner_id}`, partnerWalletData)
        .map(resp => {
          return resp.json();
        })
        .catch(this.errorService.showErrorHandler());
    } else {
      return this.http.post(`${PARTNER_WALLETS}/${partnerWallet.partner_id}`, partnerWalletData)
        .map(resp => {
          return resp.json();
        })
        .catch(this.errorService.showErrorHandler());
    }
  }

  deletePartnerWallet(partnerWallet: PartnerWallet) {
    return this.http.delete(`${PARTNER_WALLETS}/${partnerWallet.partner_id}`)
      .map(resp => resp.json())
      .catch(this.errorService.showErrorHandler());
  }
}
