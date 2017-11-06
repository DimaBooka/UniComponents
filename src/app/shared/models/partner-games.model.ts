export class PartnerGames {

  static createFromJSON(json: any) {
    const gamePartner = new PartnerGames();
    gamePartner.id = json['id'] || "";
    gamePartner.games = json['games'] || [];
    return gamePartner
  }

  constructor(
    public id: string = "",
    public games: string[] = []
  ) {}
}
