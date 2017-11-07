import { Routes } from '@angular/router';
import { PartnersComponent } from './partners.component';
import { ListPartnersComponent } from './list-partners/list-partners.component';
import { DetailPartnersComponent } from './detail-partners/detail-partners.component';
import { DetailPartnerResolver } from '../shared/resolvers/partner.resolver';

export const PARTNERS_ROUTES: Routes = [
  { path: '', component: PartnersComponent, children: [
    { path: 'partner/:id', component: DetailPartnersComponent,
      resolve: {
        detail: DetailPartnerResolver
      }
    },
    { path: '', component: ListPartnersComponent },
  ]},
];
