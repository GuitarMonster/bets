import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LiveBetsService } from '../live-bets.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'bet-live-bets',
  templateUrl: './live-bets.component.html',
  styleUrls: ['./live-bets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveBetsComponent implements OnInit {

  liveBets$ = this.liveBetsService.liveBets.pipe(
    tap(data => {
      console.log(data);
    })
  );

  constructor(private liveBetsService: LiveBetsService) { }

  ngOnInit(): void {
    this.liveBetsService.getBets();
  }

}
