import { NgModule } from '@angular/core';
import { LiveBetComponent } from './components/live-bet/live-bet.component';
import { NgPipesModule } from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LiveBetComponent
  ],
  exports: [
    NgPipesModule,
    LiveBetComponent,
    ReactiveFormsModule
  ],
  imports: [
    NgPipesModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class SharedModule { }
