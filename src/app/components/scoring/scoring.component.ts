import { Component, signal, Signal, computed } from "@angular/core";
import { ScoringService } from "../../services/scoring.service";
import { BallByBallRequest } from "../../models/BallByBallRequest";
import { BatterSummary, Summary, SummaryRequest } from "../../models/ScoreSummary";
import { BallType, ExtraRunType } from "../../enum/Enums";
import { Modal } from 'bootstrap';

@Component({
    selector: "app-scoring",
    templateUrl:"./scoring.component.html",
    styleUrl:"./scoring.component.css",
})



export class ScoringComponent{
    ballTyepNote:string = "";
    scoredByRuns:number=0;

    batsmanList : BatterSummary[] = [
        { playerId:1,playerName:"Pritam",ball:0,run:0,isOnStrike:true},
        { playerId:2,playerName:"Virat",ball:0,run:0,isOnStrike:true},
        { playerId:3,playerName:"Sunil",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Ajit",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Ajit",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Ajit",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Ajit",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Ajit",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Ajit",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Ajit",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Ajit",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Ajit",ball:0,run:0,isOnStrike:true},
    ];
    ballerList : BatterSummary[] = [
        { playerId:1,playerName:"Dr. $hyam",ball:0,run:0,isOnStrike:true},
        { playerId:2,playerName:"Mrugesh",ball:0,run:0,isOnStrike:true},
        { playerId:3,playerName:"Patel",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Anand",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Raj",ball:0,run:0,isOnStrike:true},
        { playerId:4,playerName:"Sangram",ball:0,run:0,isOnStrike:true},
    ];
    

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
        this.summaryRequest.ballNumber = resp.ball+1;
        this.summaryRequest.overNumber = resp.overs;
        this.ballTyepNote = "";
        this.scoredByRuns = 0;
        this.summaryRequest.batterPlayerId = resp.batterSummary.find(b=>b.isOnStrike==true)?.playerId??1;
        this.summaryRequest.coBatterPlayerId  = resp.batterSummary.find(b=>b.isOnStrike==false)?.playerId??2;


        if(resp.isOverFinished){
            const modalElement = document.getElementById('mdlBallerSelection');
            if (modalElement) {
              const myModal = new Modal(modalElement);
              myModal.show();
            }
        }


        return resp;
      });



    constructor(private scoringService: ScoringService, private ballByBallRequest: BallByBallRequest, private summaryRequest: SummaryRequest) {
        
        this.summaryRequest={
            matchId:1,
            ballerPlayerId:13,
            overNumber:0,
            ballNumber:1,
            batterPlayerId:this.summary().batterSummary.find(b=>b.isOnStrike==true)?.playerId??1,
            coBatterPlayerId:this.summary().batterSummary.find(b=>b.isOnStrike==false)?.playerId??2,
        }

        this.getScore()
    }

    setScoredByRunData(note : string){
        this.ballTyepNote=note;
        this.scoredByRuns=0;
    }
   
    addInScoreByRun(scoreByRun: number){
        this.scoredByRuns = this.scoredByRuns + scoreByRun;
        this.scoredByRuns = this.scoredByRuns<0?0:this.scoredByRuns 
    }

    setActive(batsmanId : number,batsmanName: string) {
        this.summary().batterSummary.push({ playerName: batsmanName, playerId: batsmanId, run: 0, ball: 0, isOnStrike: false });
    }
    
    selectStrikePlayer(playerId:number,coPlayerId:number){
        debugger;
        this.summary().batterSummary.forEach(p=>p.isOnStrike=false);
        const player = this.summary().batterSummary.find(f=>f.playerId==playerId);
        if(player){
            player.isOnStrike=true;
        }
        this.summaryRequest.batterPlayerId = playerId;
        this.summaryRequest.coBatterPlayerId = coPlayerId;
    }

    getScore():void {
        this.scoringService.getScore(this.summaryRequest).subscribe(
            (data: any) => {
                this.response.set(data);
            });
        }

    AddScore(run : number):void {
        this.note.set(this.ballTyepNote??"");
        this.run.set(run);
        debugger;

        
        //this block is written to handle 5,7 runs in main score
        //5,7 runs are coming through scoredByRuns popup that needs to set in main score not in extras
        if(this.ballTyepNote=="" && this.scoredByRuns>0){
            this.run.set(this.scoredByRuns);
            run=this.scoredByRuns;
        }else{
            this.additionalRun.set(this.scoredByRuns??0);
        }
        //this block is written to handle 5,7 runs in main score
        
        this.ballByBallRequest = {
            scoreSummaryRequest : this.summaryRequest,
            run : run,
            matchId:this.summaryRequest.matchId,
            batterPlayerId:this.summaryRequest.batterPlayerId,   
            coBatterPlayerId:this.summaryRequest.coBatterPlayerId,
            
            
            ballerPlayerId:this.summaryRequest.ballerPlayerId,
            overNumber:this.summaryRequest.overNumber,
            ballNumber:this.summaryRequest.ballNumber,
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

    UndoScore():void {
        //service call to undo score
        this.scoringService.undoScore(this.summaryRequest).subscribe(
            (data: any) => {
                this.response.set(data);
            } 
        ); 
    }
}







