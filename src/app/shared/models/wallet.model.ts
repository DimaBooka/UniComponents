export class Wallet {

  static createFromJSON(json: any) {
    const wallet = new Wallet();
    wallet.id = json['id'] || '';
    wallet.wallet_type = json['wallet_type'] || '';
    wallet.wallet_url = json['wallet_url'] || '';
    wallet.wallet_specials = json['wallet_specials'] || {};

    return wallet;
  }

  constructor(
    public id: string = '',
    public wallet_type: string = '',
    public wallet_url: string = '',
    public wallet_specials: any = {}
  ) {}
}
