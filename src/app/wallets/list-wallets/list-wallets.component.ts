import { Component, OnInit } from '@angular/core';
import { Wallet } from '../../shared/models/wallet.model';
import { WalletsService } from '../../shared/services/wallets.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-wallets',
  templateUrl: './list-wallets.component.html',
  styleUrls: ['./list-wallets.component.scss']
})
export class ListWalletsComponent implements OnInit {

  public wallets: Wallet[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private walletsService: WalletsService
  ) { }

  ngOnInit() {
    this.updateListWallets();
  }

  private updateListWallets() {
    this.walletsService.getWalletsList().subscribe((wallets: Wallet[]) => {
      this.wallets = wallets;
    });
  }

  public openCreateWallet(createModal) {
    this.modalService.open(createModal).result.then(result => {
      this.walletsService.showSuccessMessage('Wallet was successfully added');
    }, (reason) => {
      this.onCancel();
    });
  }

  public onCreate(newWallet: Wallet, closeModal: Function) {
    this.walletsService.createWallet(newWallet).subscribe((respPartner: Wallet) => {
      this.updateListWallets();
      closeModal();
    });
  }

  private onCancel() {

  }
}
