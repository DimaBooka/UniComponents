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
    NoContentComponent
  ],
  exports: [
    LoginComponent,
    NoContentComponent
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
    PartnersService
  ]
})
export class SharedModule { }
