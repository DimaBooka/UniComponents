import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { NoContentComponent } from './components/no-content/no-content.component';

import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { TokenHttp } from './services/token.service';
import { AuthService } from './services/auth.service';

import { Ng2Webstorage } from 'ngx-webstorage';

import { UsersService } from './services/users.service';
import { GamesService } from './services/games.service';
import { PartnersService } from './services/partners.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { HeadComponent } from './components/head/head.component';
import { DetailPartnerResolver } from './resolvers/partner.resolver';
import { DetailGameResolver } from './resolvers/game.resolver';
import { DetailGameConfigResolver } from './resolvers/game-config.resolver';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2Webstorage
  ],
  declarations: [
    LoginComponent,
    NoContentComponent,
    SidebarComponent,
    CardComponent,
    HeadComponent
  ],
  exports: [
    LoginComponent,
    NoContentComponent,
    SidebarComponent,
    CardComponent,
    HeadComponent
  ],
  providers: [
    {
      provide: Http,
      useClass: TokenHttp,
      deps: [XHRBackend, RequestOptions, AuthService]
    },
    UsersService,
    AuthService,
    GamesService,
    PartnersService,
    DetailPartnerResolver,
    DetailGameResolver,
    DetailGameConfigResolver
  ]
})
export class SharedModule { }
