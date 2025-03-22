import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ScoringComponent } from './components/scoring/scoring.component';
import { HttpClientModule } from '@angular/common/http';
import { ScoringService } from './services/scoring.service';
import { BallByBallRequest } from './models/BallByBallRequest';
import { Summary, SummaryRequest } from './models/ScoreSummary';

@NgModule({
  declarations: [
    AppComponent,
    ScoringComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    
  ],
  providers: [BallByBallRequest,ScoringService,SummaryRequest,Summary],
  bootstrap: [AppComponent]
})
export class AppModule { }
