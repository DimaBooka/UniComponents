import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGamePartnerGamesComponent } from './detail-game-partner-games.component';

describe('DetailGamePartnerGamesComponent', () => {
  let component: DetailGamePartnerGamesComponent;
  let fixture: ComponentFixture<DetailGamePartnerGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGamePartnerGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGamePartnerGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
