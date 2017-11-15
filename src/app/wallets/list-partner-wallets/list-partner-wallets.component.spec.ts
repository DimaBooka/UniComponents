import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartnerWalletsComponent } from './list-partner-wallets.component';

describe('ListPartnerWalletsComponent', () => {
  let component: ListPartnerWalletsComponent;
  let fixture: ComponentFixture<ListPartnerWalletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPartnerWalletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPartnerWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
