import { Component, OnInit } from '@angular/core';
import { Partner } from '../../shared/models/partner.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnersService } from '../../shared/services/partners.service';

@Component({
  selector: 'app-list-partners',
  templateUrl: './list-partners.component.html',
  styleUrls: ['./list-partners.component.scss']
})
export class ListPartnersComponent implements OnInit {

  public partners: Partner[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private partnersService: PartnersService
  ) { }

  ngOnInit() {
    this.updateListPartners();
  }

  private updateListPartners() {
    this.partnersService.getPartnersList().subscribe((partners: Partner[]) => {
      this.partners = partners;
    });
  }

  public openCreatePartner(createModal) {
    this.modalService.open(createModal).result.then(result => {
      this.partnersService.showSuccessMessage('Partner was successfully added');
    }, (reason) => {
      this.onCancel();
    });
  }

  public onCreate(newPartner: Partner, closeModal: Function) {
    this.partnersService.createPartner(newPartner).subscribe((respPartner: Partner) => {
      this.updateListPartners();
      closeModal();
    });
  }

  private onCancel() {

  }

}
