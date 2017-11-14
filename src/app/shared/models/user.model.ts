export  class User {

  static createFromJSON(json: any) {
    const user = new User();
    user.expire_at =  json['expire_at'] ? json['expire_at'].replace('T', ' ').replace(/-/g , ' ').slice(0, 19) : '';
    user.id =  json['id'] || '';
    user.p_token =  json['p_token'] || '';
    user.partner_id =  json['partner_id'] || '';
    user.session_id =  json['session_id'] || '';
    user.user_id =  json['user_id'] || '';

    return user;
  }

  constructor(
    public expire_at: string = '',
    public id: string = '',
    public p_token: string = '',
    public partner_id: string = '',
    public session_id: string = '',
    public user_id: string = ''
  ) {}

}
