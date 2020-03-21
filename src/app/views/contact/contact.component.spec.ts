import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactComponent
      ],
      imports: [SharedModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ContactComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
