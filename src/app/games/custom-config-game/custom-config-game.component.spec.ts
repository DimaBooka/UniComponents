import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConfigGameComponent } from './custom-config-game.component';

describe('CustomConfigGameComponent', () => {
  let component: CustomConfigGameComponent;
  let fixture: ComponentFixture<CustomConfigGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomConfigGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomConfigGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
