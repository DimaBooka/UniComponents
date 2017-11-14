import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { PARTNERS } from '../constants';
import { Partner } from '../models/partner.model';
import { ShowErrorHandler } from "../handlers/error.handler";
import { ToasterService } from 'angular2-toaster';
import { UsersService } from './users.service';
import { ErrorService } from './error.service';

@Injectable()
export class PartnersService {
  constructor(
    private http: Http,
    private router: Router,
    private toasterService: ToasterService,
    private errorService: ErrorService
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
      .catch(this.errorService.showErrorHandler());
  }

  getPartnerDetail(id: string) {
    return this.http.get(`${PARTNERS}/${id}`)
    // return this.http.get(PARTNERS)
      .map(resp => {
        const respData: any = resp.json();
        return Partner.createFromJSON(respData['partner']);
      })
      .catch(this.errorService.showErrorHandler());
  }

  createPartner(partner: Partner) {
    const partnerData = {...partner};
    delete partnerData.id;
    partnerData['group'] = 'Partner';
    return this.http.post(PARTNERS, partnerData)
      .map(resp => {
        return resp.json();
      })
      .catch(this.errorService.showErrorHandler());
  }

  updatePartnerDetail(partner: Partner) {
    const partnerUpdate = {...partner};
    partnerUpdate['group'] = 'Partner';
    return this.http.put(`${PARTNERS}/${partner.id}`, partnerUpdate)
      .map(resp => {
        return resp.json();
      })
      .catch(this.errorService.showErrorHandler());
  }

  deletePartner(partner: Partner) {
    return this.http.delete(`${PARTNERS}/${partner.id}`)
      .map(resp => resp.json())
      .catch(this.errorService.showErrorHandler());
  }
}
