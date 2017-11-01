import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGamesComponent } from './detail-games.component';

describe('DetailGamesComponent', () => {
  let component: DetailGamesComponent;
  let fixture: ComponentFixture<DetailGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
