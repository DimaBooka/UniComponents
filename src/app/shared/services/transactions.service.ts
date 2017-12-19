import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { TRANSACTIONS, ROUND_HISTORY } from '../constants';
import { ToasterService } from 'angular2-toaster';
import { ErrorService } from './error.service';
import { TransactionsModel } from '../models/transactions.model';
import {RoundHistoryModel} from '../models/round-history.model';

@Injectable()
export class TransService {
  constructor(
    private http: Http,
    private router: Router,
    private toasterService: ToasterService,
    private errorService: ErrorService
  ) {
  }

  showSuccessMessage(message: string) {
    this.toasterService.pop('success', message);
  }

  getRoundHistory(page: number = 1, filters: any) {
    const requestOptions = new RequestOptions();
    const search = new URLSearchParams();
    const filtersFields = Object.keys(filters);

    if (filtersFields.length > 0) {
      filtersFields.forEach(filter => {
        if (filters[filter]) {
          search.set(filter, filters[filter]);
        }
      });
    }
    search.set('page', '' + page);
    requestOptions.params = search;
    return this.http.get(ROUND_HISTORY, requestOptions)
      .map(resp => {
        const respData: any[] = resp.json();
        const transactions: RoundHistoryModel[] = [];
        if (respData['results'] && respData['results'].length > 0) {
          respData['results'].forEach(partner => {
            transactions.push(RoundHistoryModel.createFromJSON(partner));
          });
        }
        respData['results'] = transactions;
        return respData;
      })
      .catch(this.errorService.showErrorHandler());
  }

  getTransactions(page: number = 1, filters: any = {}) {
    const requestOptions = new RequestOptions();
    const search = new URLSearchParams();
    const filtersFields = Object.keys(filters);

    if (filtersFields.length > 0) {
      filtersFields.forEach(filter => {
        if (filters[filter]) {
          search.set(filter, filters[filter]);
        }
      });
    }
    search.set('page', '' + page);
    requestOptions.params = search;
    return this.http.get(TRANSACTIONS, requestOptions)
      .map(resp => {
        const respData: any[] = resp.json();
        const transactions: TransactionsModel[] = [];
        if (respData['results'] && respData['results'].length > 0) {
          respData['results'].forEach(partner => {
            transactions.push(TransactionsModel.createFromJSON(partner));
          });
        }
        respData['results'] = transactions;
        return respData;
      })
      .catch(this.errorService.showErrorHandler());
  }
}
