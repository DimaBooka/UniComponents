import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartnerWalletsComponent } from './detail-partner-wallets.component';

describe('DetailPartnerWalletsComponent', () => {
  let component: DetailPartnerWalletsComponent;
  let fixture: ComponentFixture<DetailPartnerWalletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPartnerWalletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPartnerWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
