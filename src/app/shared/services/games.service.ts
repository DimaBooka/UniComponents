import { Injectable } from '@angular/core';
import { GAMES, GAMES_CONFIGS, GAMES_PARTNERS } from '../constants';
import { Game } from '../models/game.model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { PartnerGames } from '../models/partner-games.model';
import { GameConfig } from '../models/game-config.model';
import { ShowErrorHandler } from '../handlers/error.handler';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class GamesService {
  constructor(
    private http: Http,
    private router: Router,
    private toasterService: ToasterService
  ) {
  }

  showSuccessMessage(message: string) {
    this.toasterService.pop('success', message);
  };


  // CRUD for Game entity

  getGamesList() {
    return this.http.get(GAMES)
      .map(resp => {
        const respData: any[] = resp.json();
        const games: Game[] = [];
        if (respData['games'] && respData['games'].length > 0) {
          respData['games'].forEach(game => {
            games.push(Game.createFromJSON(game));
          });
        }

        return games;
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  getGameDetail(id: string) {
    return this.http.get(`${GAMES}/${id}`)
    // return this.http.get(GAMES)
      .map(resp => {
        const respData: any = resp.json();
        return Game.createFromJSON(respData['game']);
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  createGame(game: Game) {
    return this.http.post(GAMES, game)
      .map(resp => {
        return resp.json();
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  updateGameDetail(game: Game) {
    return this.http.put(`${GAMES}/${game.id}`, game)
      .map(resp => {
        return resp.json();
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  deleteGame(game: Game) {
    return this.http.delete(`${GAMES}/${game.id}`)
      .map(resp => resp.json())
      .catch(ShowErrorHandler(this.toasterService));
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
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  getGamePartnerDetail(id: string) {
    return this.http.get(`${GAMES_PARTNERS}/${id}`)
    // return this.http.get(GAMES_PARTNERS)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerGames.createFromJSON(respData);
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  createGamePartnerDetail(gamePartner: PartnerGames) {
    return this.http.post(GAMES_PARTNERS, gamePartner)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerGames.createFromJSON(respData);
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  updateGamePartnerDetail(gamePartner: PartnerGames) {
    return this.http.put(`${GAMES_PARTNERS}/${gamePartner.id}`, gamePartner)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerGames.createFromJSON(respData);
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  deleteGamePartner(gamePartner: PartnerGames) {
    return this.http.delete(`${GAMES_PARTNERS}/${gamePartner.id}`)
      .map(resp => resp.json())
      .catch(ShowErrorHandler(this.toasterService));
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
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  getGameConfigDetail(id: string) {
    return this.http.get(`${GAMES_CONFIGS}/${id}`)
    // return this.http.get(GAMES_CONFIGS)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  createGameConfig(gameConfig: GameConfig) {
    return this.http.post(GAMES_CONFIGS, gameConfig)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  updateGameConfigDetail(gameConfig: GameConfig) {
    return this.http.put(`${GAMES_CONFIGS}/${gameConfig.id}`, gameConfig)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  deleteGameConfig(gameConfig: GameConfig) {
    return this.http.delete(`${GAMES_CONFIGS}/${gameConfig.id}`)
      .map(resp => resp.json())
      .catch(ShowErrorHandler(this.toasterService));
  }
}
