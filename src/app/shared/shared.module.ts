import { NgModule } from '@angular/core';
import { LiveBetComponent } from './components/live-bet/live-bet.component';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    LiveBetComponent
  ],
  exports: [
    NgPipesModule,
    LiveBetComponent
  ],
  imports: [
    NgPipesModule
  ],
  providers: []
})
export class SharedModule { }
