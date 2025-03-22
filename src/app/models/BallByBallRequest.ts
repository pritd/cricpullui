import { SummaryRequest } from "./ScoreSummary";

export class BallByBallRequest {
    scoreSummaryRequest: SummaryRequest;
    matchId: number;
    batterPlayerId: number;
    ballerPlayerId: number;
    overNumber: number;
    ballNumber: number;
    ballType: number;
    run: number;
    wdRun: number;
    nbRun: number;
    extraRun: number;
    extraRunTypeId: number;
    isOut: boolean;
    outTypeCode?: number;
    outBatterId?: number;    

    constructor() {
        this.scoreSummaryRequest = new SummaryRequest();
        this.matchId = 0;
        this.batterPlayerId = 0;
        this.ballerPlayerId = 0;
        this.overNumber = 0;
        this.ballNumber = 0;
        this.ballType = 0;
        this.run = 0;
        this.wdRun = 0;
        this.nbRun = 0;
        this.extraRun = 0;
        this.extraRunTypeId = 0;
        this.isOut = false;

    }
}
