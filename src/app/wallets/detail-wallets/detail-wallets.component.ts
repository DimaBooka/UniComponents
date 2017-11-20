import { Component, OnInit } from '@angular/core';
import { WalletsService } from '../../shared/services/wallets.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Wallet } from '../../shared/models/wallet.model';

@Component({
  selector: 'app-detail-wallets',
  templateUrl: './detail-wallets.component.html',
  styleUrls: ['./detail-wallets.component.scss']
})
export class DetailWalletsComponent implements OnInit {

  public id: string;
  public wallet: Wallet;
  public customConfigs: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private walletsService: WalletsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.data.subscribe(trip => {
      this.wallet = <Wallet>trip.detail;
      this.checkConfigs();
    });
  }

  checkConfigs() {
    this.customConfigs = Object.keys(this.wallet.wallet_specials).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.wallet.wallet_specials[configKey];
      return config;
    });
  }

  public openEditWallet(editOrDeleteModal) {
    this.modalService.open(editOrDeleteModal).result.then(isDelete => {
      if (!isDelete) {
        this.walletsService.showSuccessMessage('Partner was successfully updated');
      } else {
        this.walletsService.showSuccessMessage('Partner was successfully deleted');
      }
    }, (reason) => {
      this.onCancel();
    });
  }

  onEdit(wallet: Wallet, closeModal: Function) {
    debugger;
    this.walletsService.updateWalletDetail(wallet).subscribe(respWalletId => {
      this.wallet = wallet;
      this.checkConfigs();
      closeModal(false);
    });
  }

  onDelete(closeModal: Function) {
    this.walletsService.deleteWallet(this.wallet).subscribe(resp => {
      closeModal(true);
      this.router.navigate(['/wallets']);
    });
  }

  onCancel() {
  }
}
