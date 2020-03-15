import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bet-legal-note',
  templateUrl: './legal-note.component.html',
  styleUrls: ['./legal-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalNoteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
