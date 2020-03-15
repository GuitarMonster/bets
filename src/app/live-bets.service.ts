import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LiveBet } from './interfaces/live-bet.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveBetsService {
  baseUrl = environment.baseUrl;

  // preventing external source from modifying this data
  private liveBetsData = new BehaviorSubject<LiveBet[]>([]);

  liveBets: Observable<LiveBet[]> = this.liveBetsData.asObservable();

  constructor(private http: HttpClient) { }

  getBets(): void {
    console.log('hello');

    this.http.get<LiveBet[]>(this.baseUrl + 'bets')
      .pipe(
        catchError(this.handleError<LiveBet[]>('getHeroes', []))
      ).subscribe(bets => this.liveBetsData.next(bets));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
