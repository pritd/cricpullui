import { Injectable } from '@angular/core';
import { DashboardBallByBall, DashboardSummary } from '../models/DashboardSummary';
import { BallByBallRequest } from '../models/BallByBallRequest';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Summary, SummaryRequest } from '../models/ScoreSummary';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {
  ds: DashboardSummary;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) {
    this.ds = new DashboardSummary();
    this.ds.BatterTeamName = "Aero Homes";
    this.ds.Score = 21;
    this.ds.Wicket = 1;
    this.ds.TotalOvers = 2;
    this.ds.Over = 1; 
    this.ds.Ball = 3;
    this.ds.CurrentRunRate = 10.5;
    this.ds.ProjectedScore = 200;
    this.ds.BallByBall = [];
   }


  getScore(scoreSummaryRequest: SummaryRequest): Observable<SummaryRequest> {
    return this.http.get<SummaryRequest>(environment.baseUrl + "/Score/GetScoreSummary?matchId=" + scoreSummaryRequest.matchId + "&BallerPlayerId=" + scoreSummaryRequest.ballerPlayerId + "&OverNumber=" + scoreSummaryRequest.overNumber, this.httpOptions);
    // .pipe(
    //   catchError(this.handleError('addScore', ballByBallRequest))
    // );
  }
  
  addScore(ballByBallRequest: BallByBallRequest): Observable<BallByBallRequest> {
    return this.http.post<BallByBallRequest>(environment.baseUrl + "/Score/SaveScoreBallByBall", ballByBallRequest, this.httpOptions);
    // .pipe(
    //   catchError(this.handleError('addScore', ballByBallRequest))
    // );
  }

  undoScore(summaryRequest: SummaryRequest): Observable<SummaryRequest> {
    return this.http.post<BallByBallRequest>(environment.baseUrl + "/Score/UndoScoreBallByBall", summaryRequest, this.httpOptions);
    // .pipe(
    //   catchError(this.handleError('addScore', ballByBallRequest))
    // );
  }

  handleError(methodName: string, data: any): (err: any, caught: Observable<BallByBallRequest>) => import("rxjs").ObservableInput<any> {
    debugger;
    throw new Error('Method not implemented.');
  }

}
