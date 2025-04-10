export class BatterSummary {
    playerId: number;
    public playerName: string;
    run: number;
    ball: number;
    isOnStrike: boolean;

    constructor() {
        this.playerId = 0;
        this.playerName = "";
        this.run = 0;
        this.ball = 0;
        this.isOnStrike = false;
    }
}

export class BallerSummary {
    playerId: number;
    playerName: string;
    wicket: number;
    run: number;
    overs: number;
    ball: number;

    constructor() {
        this.playerId = 0;
        this.playerName = "";
        this.wicket = 0;
        this.run = 0;
        this.overs = 0;
        this.ball = 0;
    }
}

export class Team {
    teamId: number;
    teamShortName: string;
    teamName: string;
    teamLogo: string;

    constructor() {
        this.teamId = 0;
        this.teamShortName = "";
        this.teamName = "";
        this.teamLogo = "";
    }
}

export class BallByBallSummary {
    run: number;
    extraRunTypeId: number | null;
    extraRunShortCode: string | null;
    isOut: boolean;
    ballType: number;

    constructor() {
        this.run = 0;
        this.extraRunTypeId = 0;
        this.extraRunShortCode = "";
        this.isOut = false;
        this.ballType=0;
    }
}

export class SummaryRequest{
    matchId:number;
    ballerPlayerId:number;
    overNumber:number;
    
    ballNumber:number;
    batterPlayerId:number;
    coBatterPlayerId:number;

    constructor(){
        this.matchId=0;
        this.ballerPlayerId=0;
        this.overNumber=0;
        this.ballNumber=0;
        this.batterPlayerId=0;
        this.coBatterPlayerId=0        
    }
}

export class Summary {
    batterSummary: BatterSummary[];
    ballerSummary: BallerSummary;
    batterTeam: Team;
    ballerTeam: Team;
    score: number;
    wicket: number;
    overs:number;
    totalOvers: number;
    ball: number;
    ballByBallSummary: BallByBallSummary[];
    isInningFinished:boolean;
    isOverFinished:boolean;
    constructor() {
        this.batterSummary = [];
        this.ballerSummary = new BallerSummary();
        this.batterTeam = new Team();
        this.ballerTeam = new Team();
        this.score = 0;
        this.wicket = 0;
        this.overs = 0;
        this.totalOvers = 0;
        this.ball = 0;
        this.ballByBallSummary = [];
        this.isInningFinished = false;
        this.isOverFinished = false;
    }
}