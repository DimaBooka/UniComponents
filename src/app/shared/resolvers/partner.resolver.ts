import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Partner } from '../models/partner.model';
import { PartnersService } from '../services/partners.service';


@Injectable()
export class DetailPartnerResolver implements Resolve<Partner> {

  constructor(private partnerService: PartnersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    let id = route.params.id;
    return this.partnerService.getPartnerDetail(id);
  }
}
