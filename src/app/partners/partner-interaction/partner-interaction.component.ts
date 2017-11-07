import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Partner } from '../../shared/models/partner.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-partner-interaction',
  templateUrl: './partner-interaction.component.html',
  styleUrls: ['./partner-interaction.component.scss']
})
export class PartnerInteractionComponent implements OnInit {

  @Input() partner: Partner = new Partner();
  @Output() onSubmit: EventEmitter<Partner> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  private partnerForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.partnerForm = this.fb.group({
      email: [this.partner.email , []],
      password: [this.partner.password , []],
      token: [this.partner.token , []],
      available_currencies: [this.partner.available_currencies , []],
      sites: [this.partner.sites , []]
    });
  }

  onCancelForm() {
    this.onCancel.emit();
  }

  onSubmitForm() {
    const value = this.partnerForm.value;

    this.partner.email = value.email;
    this.partner.password = value.password;
    this.partner.token = value.token;
    this.partner.available_currencies = value.available_currencies;
    this.partner.sites = value.sites;

    this.onSubmit.emit(this.partner);
  }

}
