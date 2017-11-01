import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { DetailUsersComponent } from './detail-users/detail-users.component';

export const USERS_ROUTES: Routes = [
  { path: '', component:UsersComponent, children: [
    { path: 'user/:id', component: DetailUsersComponent },
    { path: '', component: ListUsersComponent },
  ]},
];
