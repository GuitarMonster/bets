
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatRippleModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    MatToolbarModule,
    MatRippleModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class BetsMaterialModule { }
