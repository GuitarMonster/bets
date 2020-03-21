import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { LiveBetsComponent } from './live-bets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LiveBetsService } from 'src/app/services/live-bets.service';
import { of } from 'rxjs';
import { LiveBet } from 'src/app/interfaces/live-bet.interface';

describe('LiveBetsComponent', () => {
  let fixture: ComponentFixture<LiveBetsComponent>;
  let component: LiveBetsComponent;

  const mockBetsService = {
    liveBets: of([], [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }] as LiveBet[]),
    getBets: () => of([] as LiveBet[]),
    startSocketPulling: () => { },
    stopSocketPulling: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LiveBetsComponent
      ],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [{ provide: LiveBetsService, useValue: mockBetsService }]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LiveBetsComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set full data to table dataSource', () => {
    expect(component.dataSource.data).toEqual([{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }] as LiveBet[]);
  });

  it('should startSocketPulling on updateRate value change', fakeAsync(() => {
    spyOn(component, 'startSocketPulling');

    component.updateRate.setValue('new');
    tick(500);
    expect(component.startSocketPulling).toHaveBeenCalledTimes(1);
  }));

  it('should NOT startSocketPulling on updateRate value change', fakeAsync(() => {
    component.updateRate.setValue('2');
    tick(500);

    spyOn(component, 'startSocketPulling');

    component.updateRate.setValue('2');
    tick(500);
    expect(component.startSocketPulling).not.toHaveBeenCalledTimes(1);

    component.updateRate.setValue('22');
    tick(500);
    expect(component.startSocketPulling).not.toHaveBeenCalledTimes(1);

    component.isLiveUpdateEnabled = false;
    component.updateRate.setValue('6');
    tick(500);
    expect(component.startSocketPulling).not.toHaveBeenCalledTimes(1);
  }));

  it('should onLiveUpdateChange', () => {
    spyOn(component, 'startSocketPulling');
    spyOn(component, 'stopSocketPulling');

    component.onLiveUpdateChange();
    expect(component.isLiveUpdateEnabled).toBe(false, 'Live update was not changed to false');
    expect(component.stopSocketPulling).toHaveBeenCalledTimes(1);

    component.onLiveUpdateChange();
    expect(component.isLiveUpdateEnabled).toBe(true, 'Live update was not changed to true');
    expect(component.startSocketPulling).toHaveBeenCalledTimes(1);
  });

  it('should startSocketPulling', () => {
    spyOn(mockBetsService, 'startSocketPulling');

    component.startSocketPulling();
    expect(mockBetsService.startSocketPulling).toHaveBeenCalledTimes(1);
  });

  it('should stopSocketPulling', () => {
    spyOn(mockBetsService, 'stopSocketPulling');

    component.stopSocketPulling();
    expect(mockBetsService.stopSocketPulling).toHaveBeenCalledTimes(1);
  });

  it('should onDestroy', () => {
    spyOn(component, 'stopSocketPulling');
    spyOn(component.destroy$, 'next');

    component.ngOnDestroy();
    expect(component.stopSocketPulling).toHaveBeenCalledTimes(1);
    expect(component.destroy$.next).toHaveBeenCalledTimes(1);
  });
});
