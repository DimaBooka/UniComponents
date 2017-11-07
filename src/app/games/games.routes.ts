import { Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import { ListGamesComponent } from './list-games/list-games.component';
import { DetailGamesComponent } from './detail-games/detail-games.component';
import { ListPartnerGamesComponent } from './list-partner-games/list-partner-games.component';
import { DetailPartnerGamesComponent } from './detail-partner-games/detail-partner-games.component';
import { ListCongifGamesComponent } from './list-congif-games/list-congif-games.component';
import { DetailConfigGamesComponent } from "./detail-config-games/detail-config-games.component";
import { DetailGameResolver } from '../shared/resolvers/game.resolver';

export const GAMES_ROUTES: Routes = [
  { path: '', component: GamesComponent, children: [
    { path: 'partner', component: ListPartnerGamesComponent },
    { path: 'partner/:id', component: DetailPartnerGamesComponent },
    { path: 'config', component: ListCongifGamesComponent },
    { path: 'config/:id', component: DetailConfigGamesComponent },
    { path: 'game/:id', component: DetailGamesComponent,
      resolve: {
        detail: DetailGameResolver
      }
    },
    { path: '', component: ListGamesComponent },
  ] }
];
