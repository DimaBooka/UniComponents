import { Injectable } from '@angular/core';
import { GAMES, GAMES_CONFIGS, GAMES_PARTNERS } from '../constants';
import { Game } from '../models/game.model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { PartnerGames } from '../models/partner-games.model';
import { GameConfig } from '../models/game-config.model';
import { ShowErrorHandler } from '../handlers/error.handler';
import { ToasterService } from 'angular2-toaster';
import { UsersService } from './users.service';
import { ErrorService } from './error.service';

@Injectable()
export class GamesService {
  constructor(
    private http: Http,
    private router: Router,
    private toasterService: ToasterService,
    private errorService: ErrorService
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
      .catch(this.errorService.showErrorHandler());
  }

  getGameDetail(id: string) {
    return this.http.get(`${GAMES}/${id}`)
    // return this.http.get(GAMES)
      .map(resp => {
        const respData: any = resp.json();
        return Game.createFromJSON(respData['game']);
      })
      .catch(this.errorService.showErrorHandler());
  }

  createGame(game: Game) {
    const gameData = {...game};
    delete gameData.id;
    return this.http.post(GAMES, gameData)
      .map(resp => {
        return resp.json();
      })
      .catch(this.errorService.showErrorHandler());
  }

  updateGameDetail(game: Game) {
    const gameData = {...game};
    delete gameData.id;
    debugger;
    return this.http.put(`${GAMES}/${game.id}`, gameData)
      .map(resp => {
        return resp.json();
      })
      .catch(this.errorService.showErrorHandler());
  }

  deleteGame(game: Game) {
    return this.http.delete(`${GAMES}/${game.id}`)
      .map(resp => resp.json())
      .catch(this.errorService.showErrorHandler());
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
      .catch(this.errorService.showErrorHandler());
  }

  getGamePartnerDetail(id: string) {
    return this.http.get(`${GAMES_PARTNERS}/${id}`)
    // return this.http.get(GAMES_PARTNERS)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerGames.createFromJSON(respData);
      })
      .catch(this.errorService.showErrorHandler());
  }

  createGamePartnerDetail(gamePartner: PartnerGames) {
    return this.http.post(GAMES_PARTNERS, gamePartner)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerGames.createFromJSON(respData);
      })
      .catch(this.errorService.showErrorHandler());
  }

  updateGamePartnerDetail(gamePartner: PartnerGames) {
    return this.http.put(`${GAMES_PARTNERS}/${gamePartner.id}`, gamePartner)
      .map(resp => {
        const respData: any = resp.json();
        return PartnerGames.createFromJSON(respData);
      })
      .catch(this.errorService.showErrorHandler());
  }

  deleteGamePartner(gamePartner: PartnerGames) {
    return this.http.delete(`${GAMES_PARTNERS}/${gamePartner.id}`)
      .map(resp => resp.json())
      .catch(this.errorService.showErrorHandler());
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
      .catch(this.errorService.showErrorHandler());
  }

  getGameConfigDetail(id: string) {
    return this.http.get(`${GAMES_CONFIGS}/${id}`)
    // return this.http.get(GAMES_CONFIGS)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      })
      .catch(this.errorService.showErrorHandler());
  }

  createGameConfig(gameConfig: GameConfig) {
    const gameConfigData = {...gameConfig};
    delete gameConfigData.id;
    gameConfigData['game_id'] = gameConfigData.game;
    return this.http.put(GAMES_CONFIGS, gameConfigData)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      })
      .catch(this.errorService.showErrorHandler());
  }

  updateGameConfigDetail(gameConfig: GameConfig) {
    const gameConfigData = {...gameConfig};
    delete gameConfigData.id;
    return this.http.put(`${GAMES_CONFIGS}/${gameConfig.id}`, gameConfigData)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      })
      .catch(this.errorService.showErrorHandler());
  }

  deleteGameConfig(gameConfig: GameConfig) {
    return this.http.delete(`${GAMES_CONFIGS}/${gameConfig.id}`)
      .map(resp => resp.json())
      .catch(this.errorService.showErrorHandler());
  }
}
