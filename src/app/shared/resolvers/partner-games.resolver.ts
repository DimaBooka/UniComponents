import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from '../services/games.service';
import { PartnerGames } from '../models/partner-games.model';

@Injectable()
export class DetailPartnerGameResolver implements Resolve<PartnerGames> {

  constructor(private gameService: GamesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    let id = route.params.id;
    return this.gameService.getGamePartnerDetail(id);
  }
}
