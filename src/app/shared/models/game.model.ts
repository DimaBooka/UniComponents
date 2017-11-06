export class Game {

  static createFromJSON(json: any) {
    const game = new Game();
    game.id = json['id'] || "";
    game.title = json['title'] || "";
    game.description = json['description'] || "";
    game.picture_url = json['picture_url'] || "";
    game.game_url = json['game_url'] || "";
    game.secret_key = json['secret_key'] || "";
    return game;
  }

  constructor(
    public id: string = "",
    public title: string = "",
    public description: string = "",
    public picture_url: string = "",
    public game_url: string = "",
    public secret_key: string = "",
  ) {}
}
