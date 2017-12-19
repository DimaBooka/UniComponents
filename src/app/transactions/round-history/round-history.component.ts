import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TransService} from '../../shared/services/transactions.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoundHistoryModel} from '../../shared/models/round-history.model';

@Component({
  selector: 'app-round-history',
  templateUrl: './round-history.component.html',
  styleUrls: ['./round-history.component.scss']
})
export class RoundHistoryComponent implements OnInit {
  public roundHystory: RoundHistoryModel[] = [];
  public page: number = 1;
  public pages: number[] = [];
  public filters: any = {};
  public filterGroup: FormGroup;
  public selectedRoundHistory: any[];
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
      round_id: ['', []],
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
    this.transService.getRoundHistory(this.page, this.filters).subscribe((roundHystoryInfo: any) => {
      if (first) {
        let pages: number;

        if (roundHystoryInfo['items'] > roundHystoryInfo['offset']) {
          const rest = roundHystoryInfo['items'] % roundHystoryInfo['offset'];
          pages = Math.round(roundHystoryInfo['items'] / roundHystoryInfo['offset']) + (rest > 0 ? 1 : 0);
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
      this.roundHystory = roundHystoryInfo['results'];
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

  public openHistory(modal, roundHistory: RoundHistoryModel) {
    this.selectedRoundHistory = [];

    const keys = Object.keys(roundHistory.round_history);
    if (keys && keys.length > 0) {
      keys.forEach(key => {
        const config = {};
        config['key'] = key;
        config['value'] = roundHistory.round_history[key];
        this.selectedRoundHistory.push(config);
      });
    }

    this.modalService.open(modal).result.then(
      result => {},
      reason => {});
  }

  public onEnterPress(event) {
    if (event && event.keyCode === 13) {
      this.updateListTransactions();
    }
  }
}
