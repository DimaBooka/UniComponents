export class PartnerWallet {

  static createFromJSON(json: any) {
    const partnerWallet = new PartnerWallet();
    partnerWallet.id = json['id'] || '';
    partnerWallet.USD = json['USD'] || '';
    partnerWallet.EUR = json['EUR'] || '';
    return partnerWallet;
  }

  constructor(
    public id: string = '',
    public USD: string = '',
    public EUR: string = ''
  ) {}
}
