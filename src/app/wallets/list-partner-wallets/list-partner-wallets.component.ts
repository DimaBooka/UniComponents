import { Component, OnInit } from '@angular/core';
import { PartnerWallet } from '../../shared/models/partner-wallet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletsService } from '../../shared/services/wallets.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-partner-wallets',
  templateUrl: './list-partner-wallets.component.html',
  styleUrls: ['./list-partner-wallets.component.scss']
})
export class ListPartnerWalletsComponent implements OnInit {

  public partnerWallet: PartnerWallet[] = [];
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
    this.walletsService.getPartnerWalletsList().subscribe((wallets: PartnerWallet[]) => {
      this.partnerWallet = wallets;
    });
  }

  public openCreateWallet(createModal) {
    this.modalService.open(createModal).result.then(result => {
      this.walletsService.showSuccessMessage('Wallet was successfully added');
    }, (reason) => {
      this.onCancel();
    });
  }

  public onCreate(newPartnerWallet: PartnerWallet, closeModal: Function) {
    this.walletsService.createPartnerWallet(newPartnerWallet).subscribe((respPartner: PartnerWallet) => {
      this.updateListWallets();
      closeModal();
    });
  }

  private onCancel() {

  }
}
