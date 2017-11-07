import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { PartnersComponent } from "./partners.component";
import { ListPartnersComponent } from './list-partners/list-partners.component';
import { DetailPartnersComponent } from './detail-partners/detail-partners.component';

import { PARTNERS_ROUTES } from './partners.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { PartnerInteractionComponent } from './partner-interaction/partner-interaction.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PARTNERS_ROUTES),
    SharedModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    PartnersComponent,
    ListPartnersComponent,
    DetailPartnersComponent,
    PartnerInteractionComponent
  ]
})
export class PartnersModule { }
