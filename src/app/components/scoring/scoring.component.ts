import { Component } from "@angular/core";
import { DashboardBallByBall, DashboardSummary } from "../../models/DashboardSummary";
import { ScoringService } from "../../services/scoring.service";
import { HttpClient } from "@angular/common/http";
import { BallByBallRequest } from "../../models/BallByBallRequest";
import { Observable } from "rxjs";
import { ScoreSummary, ScoreSummaryRequest } from "../../models/ScoreSummary";
import { state } from "@angular/animations";
import { BallType, ExtraRunType } from "../../enum/Enums";


@Component({
    selector: "app-scoring",
    templateUrl:"./scoring.component.html",
    styleUrl:"./scoring.component.css"

})



export class ScoringComponent{
    ds:DashboardSummary;

    constructor(private scoreService: ScoringService, private ballByBallRequest: BallByBallRequest, private ssr: ScoreSummaryRequest,public ss:ScoreSummary) {
        this.ds = new DashboardSummary();
        this.ssr.matchId = 1;
        this.ssr.BallerPlayerId = 13;
        this.ssr.OverNumber = 0;
        
        this.ssr.BallNumber = 1;
        this.ssr.BatterPlayerId = 1;
        this.getScore()
    }

    getScore():void {
        this.scoreService.getScore(this.ssr).subscribe(
            (data: any) => {    
                this.ss=data;
                this.ss.ball =  this.ss.ballByBallSummary.filter(element => element.ballType===BallType.FairDelivery).length;
                this.ss.overs = this.ssr.OverNumber;
                this.ssr.BallNumber = this.ss.ball+1;

                if(this.ssr.BallNumber>6){
                    this.ssr.BallNumber=1;
                    this.ss.ball = 0;
                    this.ssr.OverNumber++;
                    this.ss.overs = this.ssr.OverNumber;
                    this.ssr.BallerPlayerId = this.ssr.BallerPlayerId==13?14:13;
                }
            });
        }

    AddScore(run : number,note? : string,additionalRun?:number):void {
        this.ballByBallRequest.scoreSummaryRequest = this.ssr;
        this.ballByBallRequest.run = run;
        this.ballByBallRequest.matchId=this.ssr.matchId;
        this.ballByBallRequest.batterPlayerId=this.ssr.BatterPlayerId;   
        this.ballByBallRequest.ballerPlayerId=this.ssr.BallerPlayerId;
        this.ballByBallRequest.overNumber=this.ssr.OverNumber;
        this.ballByBallRequest.ballNumber=this.ssr.BallNumber;
        this.ballByBallRequest.ballType=BallType.FairDelivery;
        this.ballByBallRequest.extraRunTypeId=ExtraRunType.NA;
        this.ballByBallRequest.nbRun=0;
        this.ballByBallRequest.wdRun=0;
        this.ballByBallRequest.extraRun=0;

        if(note==="NB"){
            this.ballByBallRequest.ballType=BallType.NoBall;
            this.ballByBallRequest.nbRun=additionalRun==undefined?0:additionalRun;                                 //pending
            this.ballByBallRequest.extraRun=1;
            this.ballByBallRequest.extraRunTypeId=ExtraRunType.NoBall;
        }
        else if(note==="WB"){
            this.ballByBallRequest.ballType=BallType.WideBall;
            this.ballByBallRequest.wdRun=additionalRun==undefined?0:additionalRun;                                //pending        
            this.ballByBallRequest.extraRun=1;
            this.ballByBallRequest.extraRunTypeId=ExtraRunType.WideBall;
        }


        if(note==="BYE"){
            this.ballByBallRequest.extraRun=additionalRun==undefined?0:additionalRun;
            this.ballByBallRequest.extraRunTypeId=ExtraRunType.ByeWithoutBat;                //5 is pending;
        }else if(note==="LB"){
            this.ballByBallRequest.extraRun=additionalRun==undefined?0:additionalRun;
            this.ballByBallRequest.extraRunTypeId=ExtraRunType.LegBye;
        }
        if(note==="W")
            this.ballByBallRequest.isOut=true;
        else
            this.ballByBallRequest.isOut=false;
        

        //service call to add score
        this.scoreService.addScore(this.ballByBallRequest).subscribe(
            (data: any) => {
                this.ss=data;
                this.ss.ball =  this.ss.ballByBallSummary.filter(element => element.ballType===BallType.FairDelivery).length;
                this.ss.overs = this.ssr.OverNumber;
                this.ssr.BallNumber = this.ss.ball+1;

                if(this.ssr.BallNumber>6){
                    this.ssr.BallNumber=1;
                    this.ss.ball = 0;
                    this.ssr.OverNumber++;
                    this.ss.overs = this.ssr.OverNumber;
                    this.ssr.BallerPlayerId = this.ssr.BallerPlayerId==13?14:13;
                }
            } 
        ); 
    }
}







