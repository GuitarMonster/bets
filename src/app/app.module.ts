import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LiveBetsComponent } from './components/live-bets/live-bets.component';
import { LiveComponent } from './views/live/live.component';
import { SharedModule } from './shared/shared.module';
import { BetsMaterialModule } from './shared/material.module';
import { ContactComponent } from './views/contact/contact.component';
import { environment } from '../environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: environment.baseUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LiveBetsComponent,
    ToolbarComponent,
    LiveComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    BetsMaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
