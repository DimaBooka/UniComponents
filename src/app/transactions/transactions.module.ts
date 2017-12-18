import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundHistoryComponent } from './round-history/round-history.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransComponent } from './trans-holder.componen';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TRANSACTIONS_ROUTES } from './transactions.router';
import { ToasterModule } from 'angular2-toaster';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TRANSACTIONS_ROUTES),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    NgbModule
  ],
  declarations: [TransComponent, RoundHistoryComponent, TransactionsComponent]
})
export class TransactionsModule { }
