import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerWalletInteractionComponent } from './partner-wallet-interaction.component';

describe('PartnerWalletInteractionComponent', () => {
  let component: PartnerWalletInteractionComponent;
  let fixture: ComponentFixture<PartnerWalletInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerWalletInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerWalletInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
