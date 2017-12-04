import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { NoContentComponent } from './shared/components/no-content/no-content.component';
import { NoAuthGuard } from './shared/guards/not-auth.guard';
import { AuthGuard } from './shared/guards/auth.guard';


export const ROUTES: Routes = [
  { path: '', component: AppComponent },
  { path: 'partners', loadChildren: './partners/partners.module#PartnersModule', canActivate: [AuthGuard]},
  { path: 'games', loadChildren: './games/games.module#GamesModule', canActivate: [AuthGuard]},
  // { path: 'users', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard]},
  { path: 'wallets', loadChildren: './wallets/wallets.module#WalletsModule', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },

  { path: '**', component: NoContentComponent }
];
