import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, skip, tap, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { LiveBet } from 'src/app/interfaces/live-bet.interface';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import { LiveBetsService } from 'src/app/services/live-bets.service';

@Component({
  selector: 'bet-live-bets',
  templateUrl: './live-bets.component.html',
  styleUrls: ['./live-bets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveBetsComponent implements AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>();

  // turned out Angular still does not support min/max validators for template-driven forms
  // https://github.com/angular/angular/issues/16352
  updateRate = new FormControl(2, [Validators.min(1), Validators.max(20)]);
  isLiveUpdateEnabled = true;
  columnsToDisplay = ['match', 'firstWin', 'draw', 'secondWin'];
  dataSource = new MatTableDataSource<LiveBet>([]);

  @Input() previewMode = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  liveBets$ = this.liveBetsService.liveBets.pipe(
    takeUntil(this.destroy$),
    skip(1),
    map((data: LiveBet[]) => !!this.previewMode ? data.slice(0, 5) : data),
    tap((data: LiveBet[]) => this.dataSource.data = data)
  ).subscribe();

  constructor(private liveBetsService: LiveBetsService) {
    this.liveBetsService.getBets();
    this.startSocketPulling();

    this.updateRate.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      debounceTime(400),
    ).subscribe(() => {
      if (!!this.updateRate.valid && !!this.isLiveUpdateEnabled) {
        this.startSocketPulling();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onLiveUpdateChange(): void {
    this.isLiveUpdateEnabled = !this.isLiveUpdateEnabled;
    !!this.isLiveUpdateEnabled ? this.startSocketPulling() : this.stopSocketPulling();
  }

  startSocketPulling(): void {
    this.liveBetsService.startSocketPulling(this.updateRate.value);
  }

  stopSocketPulling(): void {
    this.liveBetsService.stopSocketPulling();
  }

  ngOnDestroy(): void {
    this.stopSocketPulling();
    this.destroy$.next();
  }
}
