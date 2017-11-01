import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCongifGamesComponent } from './list-congif-games.component';

describe('ListCongifGamesComponent', () => {
  let component: ListCongifGamesComponent;
  let fixture: ComponentFixture<ListCongifGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCongifGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCongifGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
