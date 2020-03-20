import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BetsMaterialModule } from './material.module';

@NgModule({
  declarations: [],
  exports: [
    ReactiveFormsModule,
    BetsMaterialModule
  ],
  imports: [
    ReactiveFormsModule,
    BetsMaterialModule
  ],
  providers: []
})
export class SharedModule { }
