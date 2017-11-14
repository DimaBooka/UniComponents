import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { UsersService } from '../services/users.service';


@Injectable()
export class DetailUserResolver implements Resolve<Game> {

  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    let id = route.params.id;
    return this.usersService.getUserDetail(id);
  }
}
