import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';

export const USERS_ROUTES: Routes = [
  { path: '', component:UsersComponent, children: [
    { path: '', component: ListUsersComponent },
  ]},
];
