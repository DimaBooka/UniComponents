export class TransactionsModel {

  static createFromJSON(json: any) {
    const object = new TransactionsModel();
    object.amount = json['amount'] ? json['amount'] : null
    object.balance_after = json['balance_after'] ? json['balance_after'] : 0;
    object.config_id = json['config_id'] ? json['config_id'] : '';
    object.currency = json['currency'] ? json['currency'] : '';
    object.id = json['id'] ? json['id'] : '';
    object.partner_id = json['partner_id'] ? json['partner_id'] : '';
    object.rollback_transaction_id = json['rollback_transaction_id'] ? json['rollback_transaction_id'] : '';
    object.time = json['time'] ? json['time'] : '';
    object.transaction_id = json['transaction_id'] ? json['transaction_id'] : '';
    object.transaction_type = json['transaction_type'] ? json['transaction_type'] : '';
    object.user_id = json['user_id'] ? json['user_id'] : '';
    return object;
  }

  constructor(
    public amount: any = null,
    public balance_after: number = 0,
    public config_id: string = '',
    public currency: string = '',
    public id: string = '',
    public partner_id: string = '',
    public rollback_transaction_id: string = '',
    public time: string = '',
    public transaction_id: string = '',
    public transaction_type: string = '',
    public user_id: string = '',
  ) {}
}
