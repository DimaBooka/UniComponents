export class Partner {

  static createFromJSON(json: any) {
    const partner = new Partner();
    partner.id = json['id'] || "";
    partner.email = json['email'] || "";
    partner.password = json['password'] || "";
    partner.token = json['token'] || "";
    partner.available_currencies = json['available_currencies'] || [];
    partner.sites = json['sites'] || [];
    return partner;
  }

  constructor(
    public id: string = "",
    public email: string = "",
    public password: string = "",
    public token: string = "",
    public available_currencies: string[] = [],
    public sites: string[] = [],
  ) {}
}
