import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalNoteComponent } from './legal-note.component';

describe('LegalNoteComponent', () => {
  let component: LegalNoteComponent;
  let fixture: ComponentFixture<LegalNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
