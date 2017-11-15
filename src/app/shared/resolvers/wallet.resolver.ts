import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WalletsService } from '../services/wallets.service';
import { Wallet } from '../models/wallet.model';

@Injectable()
export class DetailWalletResolver implements Resolve<Wallet> {

  constructor(private walletService: WalletsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    const id = route.params['id'];
    return this.walletService.getWalletDetail(id);
  }
}
