export class RoundHistoryModel {

  static createFromJSON(json: any) {
    const object = new RoundHistoryModel();
    object.config_id = json['config_id'] ? json['config_id'] : '';
    object.history_data = json['history_data'] ? json['history_data'] : '';
    object.id = json['id'] ? json['id'] : '';
    object.partner_id = json['partner_id'] ? json['partner_id'] : '';
    object.round_history = json['round_history'] ? json['round_history'] : '';
    object.time = json['time'] ? json['time'] : '';
    object.user_id = json['user_id'] ? json['user_id'] : '';
    return object;
  }

  constructor(
    public config_id: string = '',
    public history_data: any = null,
    public id: string = '',
    public partner_id: string = '',
    public round_history: any = {},
    public time: string = '',
    public user_id: string = ''
) {}
}
