import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { PARTNERS } from '../constants';
import { Partner } from '../models/partner.model';

@Injectable()
export class PartnersService {
  constructor(
    private http: Http,
    private router: Router
  ) {
  }

  getPartnersList() {
    return this.http.get(PARTNERS)
      .map(resp => {
        const respData: any[] = resp.json();
        const partners: Partner[] = [];

        if (respData.length > 0) {
          respData.forEach(partner => {
            partners.push(Partner.createFromJSON(partner));
          });
        }

        return partners;
      });
  }

  getPartnerDetail(id: string) {
    return this.http.get(`${PARTNERS}/${id}`)
    // return this.http.get(PARTNERS)
      .map(resp => {
        const respData: any = resp.json();
        return Partner.createFromJSON(respData);
      });
  }

  createPartner(partner: Partner) {
    return this.http.post(PARTNERS, partner)
      .map(resp => {
        const respData: any = resp.json();
        return Partner.createFromJSON(respData);
      });
  }

  updatePartnerDetail(partner: Partner) {
    return this.http.patch(`${PARTNERS}/${partner.id}`, partner)
      .map(resp => {
        const respData: any = resp.json();
        return Partner.createFromJSON(respData);
      });
  }

  deletePartner(partner: Partner) {
    return this.http.delete(`${PARTNERS}/${partner.id}`)
      .map(resp => resp.json());
  }
}
