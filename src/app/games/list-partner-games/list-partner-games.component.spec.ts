import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartnerGamesComponent } from './list-partner-games.component';

describe('ListPartnerGamesComponent', () => {
  let component: ListPartnerGamesComponent;
  let fixture: ComponentFixture<ListPartnerGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPartnerGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPartnerGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
