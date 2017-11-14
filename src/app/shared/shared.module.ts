import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { TextEllipsisDirective } from './directives/text-ellipsis.directive';
import { CustomConfigComponent } from './components/custom-config/custom-config.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/not-auth.guard';
import { ToasterModule } from 'angular2-toaster';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { DisplayValueComponent } from './components/display-value/display-value.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ErrorService } from './services/error.service';
import { DetailPartnerGameResolver } from './resolvers/partner-games.resolver';
import { DetailUserResolver } from './resolvers/user.resolver';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2Webstorage,
    ToasterModule,
    MultiselectDropdownModule
  ],
  declarations: [
    LoginComponent,
    NoContentComponent,
    SidebarComponent,
    CardComponent,
    HeadComponent,
    TextEllipsisDirective,
    CustomConfigComponent,
    FormFieldComponent,
    FormButtonComponent,
    DisplayValueComponent,
    DynamicFormComponent
  ],
  exports: [
    LoginComponent,
    NoContentComponent,
    SidebarComponent,
    CardComponent,
    HeadComponent,
    TextEllipsisDirective,
    CustomConfigComponent,
    FormFieldComponent,
    FormButtonComponent,
    DisplayValueComponent,
    DynamicFormComponent
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
    ErrorService,
    DetailPartnerResolver,
    DetailGameResolver,
    DetailGameConfigResolver,
    DetailPartnerGameResolver,
    DetailUserResolver,
    AuthGuard,
    NoAuthGuard
  ]
})
export class SharedModule { }
