import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LiveBetsService } from './live-bets.service';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { LiveBet } from '../interfaces/live-bet.interface';
import { skip } from 'rxjs/operators';
import { fail } from 'assert';

describe('LiveBetsService', () => {
  let service: LiveBetsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let mockSocket: any;

  beforeEach(() => {
    mockSocket = jasmine.createSpyObj('mockSocket', ['on']);

    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [{ provide: Socket, useValue: mockSocket }] });
    service = TestBed.inject(LiveBetsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set initial values', () => {
    expect(service.baseUrl).toBeTruthy();
    service.liveBets.subscribe(value => {
      expect(value).toEqual([], 'Initial liveBets were not set to []');
    });
  });

  it('should set socket listener', () => {
    expect(mockSocket.on).toHaveBeenCalledTimes(1);
    expect(mockSocket.on.calls.mostRecent().args[0]).toEqual('bet-updated');
  });

  it('should set liveBets onBetsUpdated', () => {
    const testBets = [{}, {}] as LiveBet[];

    service.liveBets.pipe(skip(1)).subscribe(bets => {
      expect(bets).toEqual(testBets);
    });
    service.onBetUpdated(testBets);
  });

  it('should update old ids and add new ids onBetsUpdated', async(() => {
    const testBets = [{ id: '1', draw: 11 }, { id: '2', draw: 22 }] as LiveBet[];
    const newBets = [{ id: '1', draw: 7 }, { id: '3', draw: 33 }] as LiveBet[];
    const result = [{ id: '1', draw: 7 }, { id: '2', draw: 22 }, { id: '3', draw: 33 }] as LiveBet[];

    service.liveBets.pipe(skip(2)).subscribe(bets => {
      expect(bets).toEqual(result, 'newBets was not processed correctly');
    });

    service.onBetUpdated(testBets);
    service.onBetUpdated(newBets);
  }));

  it('should getBets', () => {
    const testBets = [{ id: '1', draw: 11 }, { id: '2', draw: 22 }] as LiveBet[];

    service.liveBets.pipe(skip(1)).subscribe(bets => {
      expect(bets).toEqual(testBets, 'getBets did not set bets properly');
    });

    service.getBets();
    const req = httpTestingController.expectOne('http://127.0.0.1:3000/bets');

    req.flush(testBets);
    httpTestingController.verify();
  });

  it('should call handleError on failed getBets', () => {
    spyOn(service, 'handleError');

    service.liveBets.pipe(skip(1)).subscribe(() => fail('Should not receive any data'));
    service.getBets();
    const req = httpTestingController.expectOne('http://127.0.0.1:3000/bets');

    const error = new ErrorEvent('Network error', {
      message: 'test error',
    });

    req.error(error);

    expect(service.handleError).toHaveBeenCalledTimes(1);
  });

  it('should startSocketPulling', () => {
    service.startSocketPulling();
    let req = httpTestingController.expectOne('http://127.0.0.1:3000/pulling/start?rate=2');
    expect(req.request.method).toEqual('GET');

    service.startSocketPulling(4);
    req = httpTestingController.expectOne('http://127.0.0.1:3000/pulling/start?rate=4');
    expect(req.request.method).toEqual('GET');
  });

  it('should stopSocketPulling', () => {
    service.stopSocketPulling();
    const req = httpTestingController.expectOne('http://127.0.0.1:3000/pulling/stop');
    expect(req.request.method).toEqual('GET');
  });

  it('should handleError', () => {
    spyOn(console, 'error');

    service.handleError<string>('test')('test error').subscribe(data => {
      expect(data).toEqual('test');
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith('test error');
    });
  });
});
