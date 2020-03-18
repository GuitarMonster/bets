import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LiveBet } from './interfaces/live-bet.interface';
import { Socket } from 'ngx-socket-io';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveBetsService {
  baseUrl = environment.baseUrl;

  // preventing external source from modifying this data
  private liveBetsData = new BehaviorSubject<LiveBet[]>([]);
  liveBets: Observable<LiveBet[]> = this.liveBetsData.asObservable();

  constructor(private http: HttpClient, private socket: Socket) {
    socket.on('bet-updated', this.onBetUpdated.bind(this));
  }

  getBets(): void {
    this.http.get<LiveBet[]>(this.baseUrl + 'bets')
      .pipe(
        catchError(this.handleError<LiveBet[]>('getHeroes', []))
      ).subscribe(bets => this.liveBetsData.next(bets));
  }

  onBetUpdated(newBets: LiveBet[]): void {
    // console.log(performance.now()); //used to measure performance
    let liveBets = this.liveBetsData.getValue();

    if (!!liveBets.length) {
      newBets.forEach(newBet => {
        if (liveBets.some(bet => bet.id === newBet.id)) {
          const index = liveBets.findIndex(bet => bet.id === newBet.id);
          liveBets.splice(index, 1, newBet);
        } else {
          liveBets.push(newBet);
        }
      });
    } else {
      liveBets = newBets;
    }

    this.liveBetsData.next(liveBets);
    // console.log(newBets);  //used to track socket updates
    // console.log(performance.now()); //used to measure performance
  }

  startSocketPulling(rate = 2): void {
    this.http.get<void>(this.baseUrl + 'pulling/start?rate=' + rate)
      .pipe(
        catchError(this.handleError<void>('startSocket'))
      ).subscribe();
  }

  stopSocketPulling(): void {
    this.http.get<void>(this.baseUrl + 'pulling/stop')
      .pipe(
        catchError(this.handleError<void>('startSocket'))
      ).subscribe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
