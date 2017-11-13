import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { PARTNERS } from '../constants';
import { Partner } from '../models/partner.model';
import { ShowErrorHandler } from "../handlers/error.handler";
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class PartnersService {
  constructor(
    private http: Http,
    private router: Router,
    private toasterService: ToasterService
  ) {
  }

  showSuccessMessage(message: string) {
    this.toasterService.pop('success', message);
  };

  getPartnersList() {
    return this.http.get(PARTNERS)
      .map(resp => {
        const respData: any[] = resp.json();
        const partners: Partner[] = [];

        if (respData['partners'] && respData['partners'].length > 0) {
          respData['partners'].forEach(partner => {
            partners.push(Partner.createFromJSON(partner));
          });
        }

        return partners;
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  getPartnerDetail(id: string) {
    return this.http.get(`${PARTNERS}/${id}`)
    // return this.http.get(PARTNERS)
      .map(resp => {
        const respData: any = resp.json();
        return Partner.createFromJSON(respData['partner']);
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  createPartner(partner: Partner) {
    return this.http.post(PARTNERS, partner)
      .map(resp => {
        return resp.json();
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  updatePartnerDetail(partner: Partner) {
    const partnerUpdate = {...partner};
    delete partnerUpdate['id'];
    partnerUpdate['group'] = 'Partner';
    return this.http.put(`${PARTNERS}/${partner.id}`, partnerUpdate)
      .map(resp => {
        return resp.json();
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  deletePartner(partner: Partner) {
    return this.http.delete(`${PARTNERS}/${partner.id}`)
      .map(resp => resp.json())
      .catch(ShowErrorHandler(this.toasterService));
  }
}
