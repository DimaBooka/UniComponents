import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConfigGamesComponent } from './detail-config-games.component';

describe('DetailConfigGamesComponent', () => {
  let component: DetailConfigGamesComponent;
  let fixture: ComponentFixture<DetailConfigGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailConfigGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailConfigGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
