import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ScoringComponent } from './components/scoring/scoring.component';
import { HttpClientModule } from '@angular/common/http';
import { ScoringService } from './services/scoring.service';
import { BallByBallRequest } from './models/BallByBallRequest';
import { ScoreSummary, ScoreSummaryRequest } from './models/ScoreSummary';

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
  providers: [BallByBallRequest,ScoringService,ScoreSummaryRequest,ScoreSummary],
  bootstrap: [AppComponent]
})
export class AppModule { }
