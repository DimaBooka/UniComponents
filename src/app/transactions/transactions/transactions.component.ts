import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {TransService} from '../../shared/services/transactions.service';
import {TransactionsModel} from '../../shared/models/transactions.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debug} from 'util';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public transactions: TransactionsModel[] = [];
  public page: number = 1;
  public pages: number[] = [];
  public filters: any = {};
  public filterGroup: FormGroup;
  public options: any[] = [
    // {name: 'Get Balance', id: 'get_balance'},
    {name: 'Debit', id: 'debit'},
    {name: 'Credit', id: 'credit'},
    {name: 'Rollback', id: 'rollback'},
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private transService: TransService
  ) { }

  ngOnInit() {
    this.filterGroup = this.fb.group({
      fromDate: ['', []],
      fromTime: ['', []],
      tillDate: ['', []],
      tillTime: ['', []],
      transaction_type: ['', []],
      user_id: ['', []],
      config_id: ['', []]
    });
    this.updateListTransactions(true);
  }

  setPage(page: number) {
    if (this.page !== page) {
      this.page = page;
      console.log(page);
      this.updateListTransactions();
    }
  }

  private updateListTransactions(first: boolean = false) {
    this.transService.getTransactions(this.page, this.filters).subscribe((transactionsInfo: any) => {
      if (first) {
        let pages: number;

        if (transactionsInfo['items'] > transactionsInfo['offset']) {
          const rest = transactionsInfo['items'] % transactionsInfo['offset'];
          pages = Math.round(transactionsInfo['items'] / transactionsInfo['offset']) + (rest > 0 ? 1 : 0);
        } else {
          pages = 1;
        }
        this.pages = new Array(pages);

        this.filterGroup.valueChanges.subscribe(values => {
          this.filters = values;
          if (values.fromDate || values.fromDate && values.fromTime) {
            this.filters['from'] = this.getDate(values.fromDate, values.fromTime);
          }

          if (values.tillDate || values.tillDate && values.tillTime) {
            this.filters['till'] = this.getDate(values.tillDate, values.tillTime);
          }

          delete this.filters['fromDate'];
          delete this.filters['fromTime'];
          delete this.filters['tillDate'];
          delete this.filters['tillTime'];
          this.updateListTransactions();
        });
      }
      this.transactions = transactionsInfo['results'];
    });
  }

  getDate(date: any, time: any) {
    let dateTime: any = new Date();
    if (date && date.year) {
      dateTime = new Date(dateTime.setFullYear(date.year));
    }
    if (date && date.month) {
      dateTime = new Date(dateTime.setMonth(date.month - 1));
    }
    if (date && date.day) {
      dateTime = new Date(dateTime.setDate(date.day));
    }
    if (time && time.hour) {
      dateTime = new Date(dateTime.setHours(time.hour));
    } else { dateTime = new Date(dateTime.setHours(0)); }
    if (time && time.minute) {
      dateTime = new Date(dateTime.setMinutes(time.minute));
    } else { dateTime = new Date(dateTime.setMinutes(0)); }
    if (time && time.second) {
      dateTime = new Date(dateTime.setSeconds(time.second));
    } else { dateTime = new Date(dateTime.setSeconds(0)); }

    try {
      return new Date(dateTime).toISOString().replace('Z', '');
    } catch (e) {
      return '';
    }
  }

  public onEnterPress(event) {
    if (event && event.keyCode === 13) {
      this.updateListTransactions();
    }
  }
}
