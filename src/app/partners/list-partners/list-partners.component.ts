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
    // this.updateListPartners();
  }

  private updateListPartners() {
    this.partnersService.getPartnersList().subscribe((partners: Partner[]) => {
      this.partners = partners;
    });
  }

  public openCreatePartner(createModal) {
    this.modalService.open(createModal).result.then((result: Partner) => {
      this.onCreate(result);
    }, (reason) => {
      this.onCancel();
    });
  }

  private onCreate(newPartner: Partner) {
    this.partnersService.createPartner(newPartner).subscribe((respPartner: Partner) => {
      this.updateListPartners();
    });
  }

  private onCancel() {

  }

}
