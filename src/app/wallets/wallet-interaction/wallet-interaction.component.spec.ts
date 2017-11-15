import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletInteractionComponent } from './wallet-interaction.component';

describe('WalletInteractionComponent', () => {
  let component: WalletInteractionComponent;
  let fixture: ComponentFixture<WalletInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
