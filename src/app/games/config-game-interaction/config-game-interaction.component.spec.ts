import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGameInteractionComponent } from './config-game-interaction.component';

describe('ConfigGameInteractionComponent', () => {
  let component: ConfigGameInteractionComponent;
  let fixture: ComponentFixture<ConfigGameInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigGameInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGameInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
