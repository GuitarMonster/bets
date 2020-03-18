import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  exports: [
    NgPipesModule,
    ReactiveFormsModule
  ],
  imports: [
    NgPipesModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class SharedModule { }
