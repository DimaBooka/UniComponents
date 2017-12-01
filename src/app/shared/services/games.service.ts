import { Injectable } from '@angular/core';
import { GAMES, GAMES_CONFIGS, GAMES_PARTNERS } from '../constants';
import { Game } from '../models/game.model';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { PartnerGame } from '../models/partner-games.model';
import { GameConfig } from '../models/game-config.model';
import { ToasterService } from 'angular2-toaster';
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
        const games: PartnerGame[] = [];
        if (respData['partner_games'] && respData['partner_games'].length > 0) {
          respData['partner_games'].forEach(game => {
            games.push(PartnerGame.createFromJSON(game));
          });
        }

        return games;
      })
      .catch(this.errorService.showErrorHandler());
  }

  getGamePartnerDetail(id: string) {
    return this.http.get(`${GAMES_PARTNERS}/${id}`)
      .map(resp => {
        const respData: any = resp.json();
        const games: PartnerGame[] = [];
        if (respData['partner_games'] && respData['partner_games'].length > 0) {
          respData['partner_games'].forEach(game => {
            games.push(PartnerGame.createFromJSON(game));
          });
        }

        return games;
      })
      .catch(this.errorService.showErrorHandler());
  }

  // createGamePartner(gamePartner: PartnerGame) {
  //   return this.http.post(GAMES_PARTNERS, gamePartner)
  //     .map(resp => {
  //       const respData: any = resp.json();
  //       return PartnerGame.createFromJSON(respData);
  //     })
  //     .catch(this.errorService.showErrorHandler());
  // }

  updateGamePartnerDetail(newGameIds: string[], id: string) {
    const gamePartnerData = {};
    gamePartnerData['game_ids'] = newGameIds;
    return this.http.put(`${GAMES_PARTNERS}/${id}`, gamePartnerData)
      .map(resp => {
        return resp.json();
      })
      .catch(this.errorService.showErrorHandler());
  }
  //
  // deleteGamePartner(gamePartner: PartnerGame) {
  //   return this.http.delete(`${GAMES_PARTNERS}/${gamePartner.game_id}`)
  //     .map(resp => resp.json())
  //     .catch(this.errorService.showErrorHandler());
  // }


  // CRUD for Game entity

  getGameConfigsList() {
    return this.http.get(GAMES_CONFIGS)
      .map(resp => {
        const respData: any[] = resp.json();
        const gameConfigs: GameConfig[] = [];

        if (respData['game_configs'].length > 0) {
          respData['game_configs'].forEach(gameConfig => {
            gameConfigs.push(GameConfig.createFromJSON(gameConfig));
          });
        }

        return gameConfigs;
      })
      .catch(this.errorService.showErrorHandler());
  }

  getGameConfigDetail(id: string) {
    return this.http.get(`${GAMES_CONFIGS}/${id}`)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData['game_config']);
      })
      .catch(this.errorService.showErrorHandler());
  }

  createGameConfig(gameConfig: GameConfig | any, fromAdmin: boolean = false) {
    let gameConfigData;
    delete gameConfig.id;
    if (fromAdmin) {
      delete gameConfig['config'].id;
      delete gameConfig['config'].config_id;
      gameConfigData = {...gameConfig};
    } else {
      gameConfigData = {config: {...gameConfig}};
    }

    return this.http.post(GAMES_CONFIGS, gameConfigData)
      .map(resp => {
        const respData: any = resp.json();
        return GameConfig.createFromJSON(respData);
      })
      .catch(this.errorService.showErrorHandler());
  }

  updateGameConfigDetail(gameConfig: GameConfig | any, fromAdmin: boolean = false) {
    let gameConfigData;
    let configId = gameConfig.id;
    if (fromAdmin) {
      configId = gameConfig.config.config_id;
      gameConfig['config'].id = configId;

      delete gameConfig.id;
      delete gameConfig['config'].config_id;
      gameConfigData = {...gameConfig};
    } else {
      gameConfigData = {config: {...gameConfig}};
    }
    return this.http.put(`${GAMES_CONFIGS}/${configId}`, gameConfigData)
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
