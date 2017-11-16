export class PartnerWallet {

  static createFromJSON(json: any) {
    const partnerWallet = new PartnerWallet();
    partnerWallet.id = json['id'] || '';
    partnerWallet.available_wallets = json['available_wallets'] || [];
    partnerWallet.partner_id = json['partner_id'] || '';
    partnerWallet.wallets = json['wallets'] || {};
    return partnerWallet;
  }

  constructor(
    public id: string = '',
    public available_wallets: string[] = [],
    public partner_id: string = '',
    public wallets: any = {}
  ) {}
}
