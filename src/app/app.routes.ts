import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { NoContentComponent } from './shared/components/no-content/no-content.component';


export const ROUTES: Routes = [
  { path: '', component: AppComponent },
  { path: 'partners', loadChildren: './partners/partners.module#PartnersModule'},
  { path: 'games', loadChildren: './games/games.module#GamesModule'},
  { path: 'users', loadChildren: './users/users.module#UsersModule'},
  { path: 'login', component: LoginComponent },

  { path: '**', component: NoContentComponent }
];
