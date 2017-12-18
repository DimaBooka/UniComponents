import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { DetailUsersComponent } from './detail-users/detail-users.component';
import { DetailUserResolver } from '../shared/resolvers/user.resolver';

export const USERS_ROUTES: Routes = [
  { path: '', component: UsersComponent, children: [
    { path: '', component: ListUsersComponent },
    { path: 'user/:id', component: DetailUsersComponent,
      resolve: {
        detail: DetailUserResolver
      }
    },
  ]},
];
