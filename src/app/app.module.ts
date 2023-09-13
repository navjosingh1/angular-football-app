import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddHeaderInterceptor } from '../app/interceptor/add-header-interceptor.interceptor';
import { StandingsComponent } from './components/standings/standings.component';
import { TeamsComponent } from './components/teams/teams.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StandingsComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{ 
      provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor , multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
