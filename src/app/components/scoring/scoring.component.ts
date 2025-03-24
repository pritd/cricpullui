import { Component, signal, effect, Signal, computed, WritableSignal, numberAttribute } from "@angular/core";
import { DashboardBallByBall, DashboardSummary } from "../../models/DashboardSummary";
import { ScoringService } from "../../services/scoring.service";
import { HttpClient } from "@angular/common/http";
import { BallByBallRequest } from "../../models/BallByBallRequest";
import { Observable } from "rxjs";
import { Summary, SummaryRequest } from "../../models/ScoreSummary";
import { state } from "@angular/animations";
import { BallType, ExtraRunType } from "../../enum/Enums";
import { map } from 'rxjs/operators';
import { ScorebarComponent } from "../scorebar/scorebar.component";

@Component({
    selector: "app-scoring",
    templateUrl:"./scoring.component.html",
    styleUrl:"./scoring.component.css"

})



export class ScoringComponent{
    run = signal(-1);
    additionalRun = signal(-1);
    note = signal("");

    ballType:Signal<BallType> = computed(() => 
        this.note() === "NB" ? BallType.NoBall :
        this.note() === "WB" ? BallType.WideBall :
        BallType.FairDelivery
    );
    wideBallRun:Signal<number> = computed(() =>
        this.note() === "WB" ? this.additionalRun() : 0
    );
    noBallRun:Signal<number> = computed(() =>
        this.note() === "NB" ? this.additionalRun() : 0
    );
    extraRun:Signal<number> = computed(() =>
        this.note() === "NB" || this.note() === "WB" ? 1 : 
        this.note() === "BYE" || this.note() === "LB" ? this.additionalRun() : 0
    );
    extraRunType:Signal<ExtraRunType> = computed(()=>
        this.note() === "NB" ? ExtraRunType.NoBall :
        this.note() === "WB" ? ExtraRunType.WideBall :
        this.note() === "BYE" ? ExtraRunType.ByeWithoutBat :
        this.note() === "LB" ? ExtraRunType.LegBye :
        ExtraRunType.NA
    );
    isOut:Signal<boolean> = computed(() =>
        this.note() === "W" ? true : false
    );

  

    response = signal<Summary>(new Summary());
    summary  =computed(() => {
        const resp = this.response();
        if (!resp) return new Summary();
        const fairDeliveries = resp.ballByBallSummary.filter(element => element.ballType===BallType.FairDelivery).length
        this.summaryRequest.BallNumber = fairDeliveries+1;
        if(fairDeliveries==6){
            this.summaryRequest.BallNumber=1;
            this.summaryRequest.OverNumber++;
            this.summaryRequest.BallerPlayerId = this.summaryRequest.BallerPlayerId==13?14:13;
            console.log("Over changed");
        }

        return {...this.response(),
            ball:fairDeliveries===6?0:fairDeliveries,
            overs:this.summaryRequest.OverNumber,
        };
      });



    constructor(private scoringService: ScoringService, private ballByBallRequest: BallByBallRequest, private summaryRequest: SummaryRequest) {
        this.summaryRequest={
            matchId:1,
            BallerPlayerId:13,
            OverNumber:0,
            BallNumber:1,
            BatterPlayerId:1
        }

        //this.getScore()
    }

    getScore():void {
        this.scoringService.getScore(this.summaryRequest).subscribe(
            (data: any) => {
                this.response.set(data);
            });
        }

    AddScore(run : number,note? : string,additionalRun?:number):void {
        this.note.set(note??"");
        this.run.set(run);
        this.additionalRun.set(additionalRun??0);
        
        this.ballByBallRequest = {
            scoreSummaryRequest : this.summaryRequest,
            run : run,
            matchId:this.summaryRequest.matchId,
            batterPlayerId:this.summaryRequest.BatterPlayerId,   
            ballerPlayerId:this.summaryRequest.BallerPlayerId,
            overNumber:this.summaryRequest.OverNumber,
            ballNumber:this.summaryRequest.BallNumber,
            ballType:this.ballType(),
            extraRunTypeId:this.extraRunType(),
            nbRun:this.noBallRun(),
            wdRun:this.wideBallRun(),
            extraRun:this.extraRun(),
            isOut:this.isOut()
        }

        //service call to add score
        this.scoringService.addScore(this.ballByBallRequest).subscribe(
            (data: any) => {
                this.response.set(data);
            } 
        ); 
    }
}







