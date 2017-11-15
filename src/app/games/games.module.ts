import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { GamesComponent } from "./games.component";
import { ListGamesComponent } from './list-games/list-games.component';
import { DetailGamesComponent } from './detail-games/detail-games.component';
import { ListPartnerGamesComponent } from './list-partner-games/list-partner-games.component';
import { DetailPartnerGamesComponent } from './detail-partner-games/detail-partner-games.component';
import { ListCongifGamesComponent } from './list-congif-games/list-congif-games.component';
import { DetailConfigGamesComponent } from './detail-config-games/detail-config-games.component';

import { GAMES_ROUTES } from './games.routes';
import { GameInteractionComponent } from './game-interaction/game-interaction.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigGameInteractionComponent } from './config-game-interaction/config-game-interaction.component';
import { ToasterModule } from 'angular2-toaster';
import { PartnerGameInteractionComponent } from './partner-game-interaction/partner-game-interaction.component';
import { DetailGamePartnerGamesComponent } from './detail-game-partner-games/detail-game-partner-games.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GAMES_ROUTES),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ToasterModule
  ],
  declarations: [
    GamesComponent,
    ListGamesComponent,
    DetailGamesComponent,
    ListPartnerGamesComponent,
    DetailPartnerGamesComponent,
    ListCongifGamesComponent,
    DetailConfigGamesComponent,
    GameInteractionComponent,
    ConfigGameInteractionComponent,
    PartnerGameInteractionComponent,
    DetailGamePartnerGamesComponent
  ]
})
export class GamesModule { }
