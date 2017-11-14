import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerGameInteractionComponent } from './partner-game-interaction.component';

describe('PartnerGameInteractionComponent', () => {
  let component: PartnerGameInteractionComponent;
  let fixture: ComponentFixture<PartnerGameInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerGameInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerGameInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
