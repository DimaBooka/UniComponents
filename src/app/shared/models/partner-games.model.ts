export class PartnerGames {

  static createFromJSON(json: any) {
    const gamePartner = new PartnerGames();
    gamePartner.id = json['id'] || "";
    gamePartner.games = json['games'] || [];
    gamePartner.partner = json['partner'] || [];
    return gamePartner
  }

  constructor(
    public id: string = "",
    public partner: string = "",
    public games: string[] = []
  ) {}
}
