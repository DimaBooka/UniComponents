import { Component, Input, OnInit } from '@angular/core';
import { PartnerWallet } from '../../shared/models/partner-wallet.model';
import { WalletsService } from '../../shared/services/wallets.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partner-wallets-wallet',
  templateUrl: './partner-wallets-wallet.component.html',
  styleUrls: ['./partner-wallets-wallet.component.scss']
})
export class PartnerWalletsWalletComponent implements OnInit {

  public id: string;
  @Input() partnerWallet: PartnerWallet;
  public customConfigs: any[] = [];
  constructor(
    private walletsService: WalletsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.customConfigs = Object.keys(this.partnerWallet.wallets).map(configKey => {
      const config = {};
      config['key'] = configKey;
      config['value'] = this.partnerWallet.wallets[configKey];
      return config;
    });
  }


  public openEditPartnerWallet(editOrDeleteModal) {
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

  onEdit(partnerWallet: PartnerWallet, closeModal: Function) {
    let currentCurs = Object.keys(this.partnerWallet);
    let newCurs = Object.keys(partnerWallet);
    let create = true;
    newCurs.forEach(cur => {
      if (currentCurs.indexOf(cur) > -1) {
        create = false;
      }
    });
    this.walletsService.updatePartnerWalletDetail(partnerWallet, create).subscribe(respWalletId => {
      this.partnerWallet = partnerWallet;
      closeModal(false);
    });
  }

  onCancel() {
  }
}
