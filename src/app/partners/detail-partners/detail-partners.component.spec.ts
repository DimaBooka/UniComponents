import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartnersComponent } from './detail-partners.component';

describe('DetailPartnersComponent', () => {
  let component: DetailPartnersComponent;
  let fixture: ComponentFixture<DetailPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
