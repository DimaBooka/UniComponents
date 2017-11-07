import { Injectable } from '@angular/core';
import { GAMES, GAMES_CONFIGS, GAMES_PARTNERS } from '../constants';
import { Game } from '../models/game.model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { PartnerGames } from '../models/partner-games.model';
import { GameConfig } from '../models/game-config.model';

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
    return this.http.get(GAMES_PARTNERS)
      .map(resp => {
        const respData: any[] = resp.json();
        const gamePartners: PartnerGames[] = [];

        if (respData.length > 0) {
          respData.forEach(gamePartner => {
            gamePartners.push(PartnerGames.createFromJSON(gamePartner));
          });
        }

        return gamePartners;
      });
  }

  getGamePartnerDetail(id: string) {
    // this.http.get(`${GAMES_PARTNERS}/${id}`)
    return this.http.get(GAMES_PARTNERS)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerGames.createFromJSON(respData);
      });
  }

  createGamePartnerDetail(gamePartner: PartnerGames) {
    return this.http.post(GAMES_PARTNERS, gamePartner)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerGames.createFromJSON(respData);
      });
  }

  updateGamePartnerDetail(gamePartner: PartnerGames) {
    return this.http.patch(`${GAMES_PARTNERS}/${gamePartner.id}`, gamePartner)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerGames.createFromJSON(respData);
      });
  }

  deleteGamePartner(gamePartner: PartnerGames) {
    return this.http.delete(`${GAMES_PARTNERS}/${gamePartner.id}`)
      .map(resp => resp.json());
  }


  // CRUD for Game entity

  getGameConfigsList() {
    return this.http.get(GAMES_CONFIGS)
      .map(resp => {
        const respData: any[] = resp.json();
        const gameConfigs: GameConfig[] = [];

        if (respData.length > 0) {
          respData.forEach(gameConfig => {
            gameConfigs.push(GameConfig.createFromJSON(gameConfig));
          });
        }

        return gameConfigs;
      });
  }

  getGameConfigDetail(id: string) {
    // this.http.get(`${GAMES_CONFIGS}/${id}`)
    return this.http.get(GAMES_CONFIGS)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      });
  }

  createGameConfig(gameConfig: GameConfig) {
    return this.http.post(GAMES_CONFIGS, gameConfig)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      });
  }

  updateGameConfigDetail(gameConfig: GameConfig) {
    return this.http.patch(`${GAMES_CONFIGS}/${gameConfig.id}`, gameConfig)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      });
  }

  deleteGameConfig(gameConfig: GameConfig) {
    return this.http.delete(`${GAMES_CONFIGS}/${gameConfig.id}`)
      .map(resp => resp.json());
  }
}
