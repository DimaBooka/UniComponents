export class GameConfig {

  static createFromJSON(json: any) {
    const gameConfig = new GameConfig();

    gameConfig.id = json['id'] || "";
    gameConfig.game = json['game'] || "";
    gameConfig.currency = json['currency'] || "";
    gameConfig.lobby_url = json['lobby_url'] || "";
    gameConfig.min_bet = json['min_bet'] || 0;
    gameConfig.max_bet = json['max_bet'] || 0;
    gameConfig.custom_config = json['custom_config'] || {};
    return gameConfig;
  }

  constructor(
    public id: string = "",
    public game: string = "",
    public currency: string = "",
    public lobby_url: string = "",
    public min_bet: number = 0,
    public max_bet: number = 0,
    public custom_config: any = {}
  ) {}
}
