import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { DetailUsersComponent } from './detail-users/detail-users.component';

import { USERS_ROUTES } from './users.routes';
import { UserInteractionComponent } from './user-interaction/user-interaction.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USERS_ROUTES),
    SharedModule
  ],
  declarations: [
    UsersComponent,
    ListUsersComponent,
    DetailUsersComponent,
    UserInteractionComponent
  ]
})
export class UsersModule { }
