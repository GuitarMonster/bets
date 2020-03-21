import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';

@Component({ selector: 'bet-live-bets', template: '' })
class LiveBetsStubComponent { }

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent, LiveBetsStubComponent
      ],
      imports: [SharedModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
