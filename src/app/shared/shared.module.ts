import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LiveBetComponent } from './components/live-bet/live-bet.component';

@NgModule({
  declarations: [
    LiveBetComponent
  ],
  exports: [LiveBetComponent],
  imports: [
    BrowserModule
  ],
  providers: []
})
export class SharedModule { }
