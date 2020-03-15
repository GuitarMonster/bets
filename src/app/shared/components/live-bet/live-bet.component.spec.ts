import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveBetComponent } from './live-bet.component';

describe('LiveBetComponent', () => {
  let component: LiveBetComponent;
  let fixture: ComponentFixture<LiveBetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveBetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
