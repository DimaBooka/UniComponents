import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerInteractionComponent } from './partner-interaction.component';

describe('PartnerInteractionComponent', () => {
  let component: PartnerInteractionComponent;
  let fixture: ComponentFixture<PartnerInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
