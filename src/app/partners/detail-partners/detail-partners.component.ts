import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Partner } from '../../shared/models/partner.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnersService } from '../../shared/services/partners.service';

@Component({
  selector: 'app-detail-partners',
  templateUrl: './detail-partners.component.html',
  styleUrls: ['./detail-partners.component.scss']
})
export class DetailPartnersComponent implements OnInit {

  public id: string;
  public partner: Partner;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private partnersService: PartnersService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route.data.subscribe(trip => {
      this.partner = <Partner>trip.detail;
    });
  }

  public openEditPartner(editOrDeleteModal, isDelete) {
    this.modalService.open(editOrDeleteModal).result.then((result: Partner) => {
      if (!isDelete) {
        this.onEdit(result);
      } else {
        this.onDelete();
      }
    }, (reason) => {
      this.onCancel();
    });
  }

  onEdit(partner: Partner) {
    debugger;

    this.partnersService.updatePartnerDetail(partner).subscribe((respPartner: Partner) => {
      this.partner = respPartner;
    });
  }

  onDelete() {
    debugger;
  }

  onCancel() {
  }
}
