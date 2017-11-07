import { Injectable } from '@angular/core';
import { GAMES } from '../constants';
import { Game } from '../models/game.model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
export class GamesService {
  constructor(
    private http: Http,
    private router: Router
  ) {
  }


  // CRUD for Game entity

  getGamesList() {
    return this.http.get(GAMES)
      .map(resp => {
        const respData: any[] = resp.json();
        const games: Game[] = [];

        if (respData.length > 0) {
          respData.forEach(game => {
            games.push(Game.createFromJSON(game));
          });
        }

        return games;
      });
  }

  getGameDetail(id: string) {
    // this.http.get(`${GAMES}/${id}`)
    return this.http.get(GAMES)
      .map(resp => {
        const respData: any = resp.json();
        return Game.createFromJSON(respData);
      });
  }

  createGame(game: Game) {
    return this.http.post(GAMES, game)
      .map(resp => {
        const respData: any = resp.json();
        return Game.createFromJSON(respData);
      });
  }

  updateGameDetail(game: Game) {
    return this.http.patch(`${GAMES}/${game.id}`, game)
      .map(resp => {
        const respData: any = resp.json();
        return Game.createFromJSON(respData);
      });
  }

  deleteGame(game: Game) {
    return this.http.delete(`${GAMES}/${game.id}`)
      .map(resp => resp.json());
  }


  // CRUD for Game entity

  getGamePartnersList() {

  }

  getGamePartnerDetail() {

  }

  updateGamePartnerDetail() {

  }

  deleteGamePartner() {

  }


  // CRUD for Game entity

  getGameConfigsList() {

  }

  getGameConfigDetail() {

  }

  updateGameConfigDetail() {

  }

  deleteGameConfig() {

  }
}
