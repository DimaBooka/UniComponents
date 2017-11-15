import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from '../services/games.service';
import { PartnerGame } from '../models/partner-games.model';

@Injectable()
export class DetailGamePartnerGamesResolver implements Resolve<PartnerGame> {

  constructor(private gameService: GamesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    return this.gameService.getGamePartnersList();
  }
}
