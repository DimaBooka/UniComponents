import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListWalletsComponent } from './list-wallets/list-wallets.component';
import { DetailWalletsComponent } from './detail-wallets/detail-wallets.component';
import { ListPartnerWalletsComponent } from './list-partner-wallets/list-partner-wallets.component';
import { DetailPartnerWalletsComponent } from './detail-partner-wallets/detail-partner-wallets.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { WALLETS_ROUTES } from './wallets.routes';
import { WalletInteractionComponent } from './wallet-interaction/wallet-interaction.component';
import { PartnerWalletInteractionComponent } from './partner-wallet-interaction/partner-wallet-interaction.component';
import { WalletsComponent } from "./wallets.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WALLETS_ROUTES),
    SharedModule,
    NgbModule,
    ToasterModule
  ],
  declarations: [
    WalletsComponent,
    ListWalletsComponent,
    DetailWalletsComponent,
    ListPartnerWalletsComponent,
    DetailPartnerWalletsComponent,
    WalletInteractionComponent,
    PartnerWalletInteractionComponent
  ]
})
export class WalletsModule { }
