import { Routes } from '@angular/router';
import {TransactionsComponent} from './transactions/transactions.component';
import {RoundHistoryComponent} from './round-history/round-history.component';
import {TransComponent} from './trans-holder.componen';

export const TRANSACTIONS_ROUTES: Routes = [
  { path: '', component: TransComponent, children: [
      { path: 'transactions', component: TransactionsComponent },
      { path: 'round', component: RoundHistoryComponent },
    ]},
];
