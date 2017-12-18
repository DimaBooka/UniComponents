import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TransService} from '../../shared/services/transactions.service';
import {TransactionsModel} from '../../shared/models/transactions.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-round-history',
  templateUrl: './round-history.component.html',
  styleUrls: ['./round-history.component.scss']
})
export class RoundHistoryComponent implements OnInit {
  public roundHystory: TransactionsModel[] = [];
  public page: number = 1;
  public pages: number[] = [];
  public filters: any = {};
  public filterGroup: FormGroup;
  public options: any[] = [
    {name: 'Get Balance', id: 'get_balance'},
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
      from: ['', []],
      till: ['', []],
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
          this.updateListTransactions();
        });
      }
      this.roundHystory = roundHystoryInfo['results'];
    });
  }

  public onEnterPress(event) {
    if (event && event.keyCode === 13) {
      this.updateListTransactions();
    }
  }
}
