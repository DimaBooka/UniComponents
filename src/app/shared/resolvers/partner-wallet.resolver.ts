import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WalletsService } from '../services/wallets.service';
import { PartnerWallet } from '../models/partner-wallet.model';

@Injectable()
export class DetailPartnerWalletResolver implements Resolve<PartnerWallet> {

  constructor(private walletService: WalletsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    return this.walletService.getPartnerWalletsList();
  }
}
