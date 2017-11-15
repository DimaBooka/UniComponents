import { Routes } from '@angular/router';
import { WalletsComponent } from './wallets.component';
import { ListWalletsComponent } from './list-wallets/list-wallets.component';
import { DetailWalletsComponent } from './detail-wallets/detail-wallets.component';
import { ListPartnerWalletsComponent } from './list-partner-wallets/list-partner-wallets.component';
import { DetailPartnerWalletsComponent } from './detail-partner-wallets/detail-partner-wallets.component';
import { DetailWalletResolver } from '../shared/resolvers/wallet.resolver';
import { DetailPartnerWalletResolver } from '../shared/resolvers/partner-wallet.resolver';

export const WALLETS_ROUTES: Routes = [
  { path: '', component: WalletsComponent, children: [
    { path: '', component: ListWalletsComponent },
    { path: 'wallet/:id', component: DetailWalletsComponent,
      resolve: {
        detail: DetailWalletResolver
      }
    },
    { path: 'partners', component: ListPartnerWalletsComponent },
    { path: 'partners/:id', component: DetailPartnerWalletsComponent,
      resolve: {
        detail: DetailPartnerWalletResolver
      }
    }
  ]},
];
