import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWalletsComponent } from './detail-wallets.component';

describe('DetailWalletsComponent', () => {
  let component: DetailWalletsComponent;
  let fixture: ComponentFixture<DetailWalletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWalletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
