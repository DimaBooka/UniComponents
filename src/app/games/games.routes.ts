import { Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import { ListGamesComponent } from './list-games/list-games.component';
import { DetailGamesComponent } from './detail-games/detail-games.component';
import { ListPartnerGamesComponent } from './list-partner-games/list-partner-games.component';
import { DetailPartnerGamesComponent } from './detail-partner-games/detail-partner-games.component';
import { ListCongifGamesComponent } from './list-congif-games/list-congif-games.component';
import { DetailConfigGamesComponent } from "./detail-config-games/detail-config-games.component";
import { DetailGameResolver } from '../shared/resolvers/game.resolver';
import { DetailGameConfigResolver } from '../shared/resolvers/game-config.resolver';

export const GAMES_ROUTES: Routes = [
  { path: '', component: GamesComponent, children: [
    { path: 'partners', component: ListPartnerGamesComponent },
    { path: 'partners/:id', component: DetailPartnerGamesComponent },
    { path: 'configs', component: ListCongifGamesComponent },
    { path: 'configs/:id', component: DetailConfigGamesComponent,
      resolve: {
        detail: DetailGameConfigResolver
      }
    },
    { path: 'game/:id', component: DetailGamesComponent,
      resolve: {
        detail: DetailGameResolver
      }
    },
    { path: '', component: ListGamesComponent },
  ] }
];
