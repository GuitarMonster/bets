import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveComponent } from './live.component';
import { Component } from '@angular/core';

@Component({ selector: 'bet-live-bets', template: '' })
class LiveBetsStubComponent { }

describe('LiveComponent', () => {
  let fixture: ComponentFixture<LiveComponent>;
  let component: LiveComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LiveComponent, LiveBetsStubComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LiveComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
