export class PartnerGame {

  static createFromJSON(json: any) {
    const partnerGame = new PartnerGame();
    partnerGame.game_id = json['game_id'] || "";
    partnerGame.title = json['title'] || "";
    partnerGame.description = json['description'] || "";
    partnerGame.picture_url = json['picture_url'] || "";
    partnerGame.game_url = json['game_url'] || "";
    partnerGame.config = json['default_custom_config'] || {};
    return partnerGame;
  }

  constructor(
    public game_id: string = "",
    public title: string = "",
    public description: string = "",
    public picture_url: string = "",
    public game_url: string = "",
    public secret_key: string = "",
    public config: any = {},
  ) {}
}
