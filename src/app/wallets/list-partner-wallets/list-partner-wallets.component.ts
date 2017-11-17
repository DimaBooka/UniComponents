import { Component, OnInit } from '@angular/core';
import { PartnerWallet } from '../../shared/models/partner-wallet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletsService } from '../../shared/services/wallets.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../shared/services/users.service';
import { Partner } from '../../shared/models/partner.model';
import { PartnersService } from '../../shared/services/partners.service';

@Component({
  selector: 'app-list-partner-wallets',
  templateUrl: './list-partner-wallets.component.html',
  styleUrls: ['./list-partner-wallets.component.scss']
})
export class ListPartnerWalletsComponent implements OnInit {

  public partnerWallet: PartnerWallet;
  public partners: Partner[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private walletsService: WalletsService,
    private usersService: UsersService,
    private partnersService: PartnersService,
  ) { }

  ngOnInit() {
    if (this.usersService.permission.value) {
      this.init();
    } else {
      this.usersService.getPermissions().subscribe((permission: string) => {
        if (permission) {
          this.init();
        }
      });
    }
  }

  private init() {
    this.usersService.permission.value === 'Admin' ?
      this.updateListPartners() : this.updateListWallets();
  }

  private updateListPartners() {
    this.partnersService.getPartnersList().subscribe((partners: Partner[]) => {
      this.partners = partners;
    });
  }

  private updateListWallets() {
    this.walletsService.getPartnerWalletDetail().subscribe((wallet: PartnerWallet) => {
      this.partnerWallet = wallet;
    });
  }

  // public openCreatePartnerWallet(createModal) {
  //   this.modalService.open(createModal).result.then(result => {
  //     this.walletsService.showSuccessMessage('Wallet was successfully added');
  //   }, (reason) => {
  //     this.onCancel();
  //   });
  // }
  //
  // public onCreate(newPartnerWallet: PartnerWallet, closeModal: Function) {
  //   this.walletsService.createPartnerWallet(newPartnerWallet).subscribe((respPartner: PartnerWallet) => {
  //     this.updateListWallets();
  //     closeModal();
  //   });
  // }
  //
  // private onCancel() {
  //
  // }
}
