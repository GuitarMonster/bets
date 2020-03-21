import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ToolbarComponent', () => {
  let fixture: ComponentFixture<ToolbarComponent>;
  let component: ToolbarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent
      ],
      imports: [HttpClientTestingModule, SharedModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ToolbarComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set darkThemeEnabled to true', () => {
    expect(component.darkThemeEnabled).toBe(true, 'Failed to set darkThemeEnabled to true');
  });

  it('should emit toggleTheme', () => {
    spyOn(component.toggleTheme, 'emit');
    component.onThemeToggle();

    expect(component.toggleTheme.emit).toHaveBeenCalledTimes(1);
  });
});
