import { Routes } from '@angular/router';
import { PartnersComponent } from './partners.component';
import { ListPartnersComponent } from './list-partners/list-partners.component';
import { DetailPartnersComponent } from './detail-partners/detail-partners.component';

export const PARTNERS_ROUTES: Routes = [
  { path: '', component: PartnersComponent, children: [
    { path: 'partner/:id', component: DetailPartnersComponent },
    { path: '', component: ListPartnersComponent },
  ]},
];
