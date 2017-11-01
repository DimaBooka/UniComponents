import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartnerGamesComponent } from './detail-partner-games.component';

describe('DetailPartnerGamesComponent', () => {
  let component: DetailPartnerGamesComponent;
  let fixture: ComponentFixture<DetailPartnerGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPartnerGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPartnerGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
