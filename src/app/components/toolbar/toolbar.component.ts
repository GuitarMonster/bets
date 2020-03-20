import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bet-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Input() darkThemeEnabled = true;

  @Output() toggleTheme = new EventEmitter<void>();

  constructor() { }

  onThemeToggle() {
    this.toggleTheme.emit();
  }
}
