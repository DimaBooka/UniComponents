import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from '../services/games.service';
import { Game } from '../models/game.model';


@Injectable()
export class DetailGameResolver implements Resolve<Game> {

  constructor(private gameService: GamesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    let id = route.params.id;
    return this.gameService.getGameDetail(id);
  }
}
