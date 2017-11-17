import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerWalletsWalletComponent } from './partner-wallets-wallet.component';

describe('PartnerWalletsWalletComponent', () => {
  let component: PartnerWalletsWalletComponent;
  let fixture: ComponentFixture<PartnerWalletsWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerWalletsWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerWalletsWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
