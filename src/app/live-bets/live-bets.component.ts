import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { LiveBetsService } from '../live-bets.service';
import { tap, take, skip, map, takeUntil } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveBet } from '../interfaces/live-bet.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'bet-live-bets',
  templateUrl: './live-bets.component.html',
  styleUrls: ['./live-bets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveBetsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  liveBets$ = this.liveBetsService.liveBets.pipe(
    takeUntil(this.destroy$),
    skip(1),
    tap(data => this.dataSource.data = data)
  ).subscribe();

  dataSource = new MatTableDataSource<LiveBet>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  columnsToDisplay = ['match', 'firstWin', 'draw', 'secondWin'];
  expandedElement: LiveBet | null;

  // turned out Angular still does not support min/max validators for template-driven forms
  // https://github.com/angular/angular/issues/16352
  updateRate = new FormControl(2, [Validators.min(1), Validators.max(20)]);
  isLiveUpdateEnabled = true;

  constructor(private liveBetsService: LiveBetsService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.liveBetsService.getBets();
  }

  onUpdateRateChange() {
    if (!!this.updateRate.valid && !!this.isLiveUpdateEnabled) {
      this.startSocketPulling();
    }
  }

  onLiveUpdateChange() {
    this.isLiveUpdateEnabled = !this.isLiveUpdateEnabled;
    !!this.isLiveUpdateEnabled ? this.startSocketPulling() : this.liveBetsService.stopSocketPulling();
  }

  startSocketPulling() {
    this.liveBetsService.startSocketPulling(this.updateRate.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
