import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from '../services/games.service';
import { GameConfig } from '../models/game-config.model';


@Injectable()
export class DetailGameConfigResolver implements Resolve<GameConfig> {

  constructor(private gameService: GamesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    let id = route.params.id;
    return this.gameService.getGameConfigDetail(id);
  }
}
