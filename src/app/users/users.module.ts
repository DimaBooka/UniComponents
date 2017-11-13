import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';

import { USERS_ROUTES } from './users.routes';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USERS_ROUTES),
    SharedModule,
    ToasterModule
  ],
  declarations: [
    UsersComponent,
    ListUsersComponent
  ]
})
export class UsersModule { }
