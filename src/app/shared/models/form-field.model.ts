export class FormField {
  static createFromObject(json: any) {
    const field = new FormField();

    field.placeholder = json['placeholder'] || '';
    field.label = json['label'] || '';
    field.fieldName = json['fieldName'] || '';
    field.type = json['type'] || 'text';
    field.input = json['input'] || false;
    field.select = json['select'] || false;
    field.textarea = json['textarea'] || false;
    field.multiple = json['multiple'] || false;
    field.options = json['options'] || [];
    field.value = json['value'] || '';
    field.validators = json['validators'] || [];

    return field;
  }

  constructor(
    public placeholder: string = '',
    public label: string = '',
    public fieldName: string = '',
    public type: string = 'text',
    public input: boolean = false,
    public select: boolean = false,
    public textarea: boolean = false,
    public multiple: boolean = false,
    public options: any[] = [],
    public value: any = '',
    public validators: any[] = []
  ) {
  }
}
