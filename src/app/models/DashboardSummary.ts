export class DashboardSummary {
    Inning: number;
    BatterTeamName: string;
    BallTeamName: string;
    Score: number;
    Wicket: number;
    TotalOvers: number;
    Over: number;
    Ball: number;
    CurrentRunRate: number;
    ProjectedScore: number;
    BattingInfo: DashboardBatter[];
    BowlingInfo: DashboardBaller;
    BallByBall: DashboardBallByBall[];

    constructor() {
        this.Inning = 0;
        this.BatterTeamName = "";
        this.BallTeamName = "";        
        this.Score = 0;
        this.Wicket = 0;
        this.TotalOvers = 0;
        this.Over = 0;
        this.Ball = 0;
        this.CurrentRunRate = 0;
        this.ProjectedScore = 0;
        this.BattingInfo = [];
        this.BowlingInfo = new DashboardBaller();
        this.BallByBall = [];
    }
}

class DashboardBatter {
    Name: string;
    Score: number;
    Ball: number;
    Four: number;
    Six: number;

    constructor() {
        this.Name = "";
        this.Score = 0;
        this.Ball = 0;
        this.Four = 0;
        this.Six = 0;
    }
}

class DashboardBaller{
    Name: string;
    Over: number;
    Maiden: number;
    Run: number;
    Wicket: number;
    Economy: number;

    constructor() {
        this.Name = "";
        this.Over = 0;
        this.Maiden = 0;
        this.Run = 0;
        this.Wicket = 0;
        this.Economy = 0;
    }
}

export class DashboardBallByBall{
    Score: number;
    Note: string;
    constructor(Score:number, Note:string){ 
        this.Score = Score;
        this.Note = Note;
    }

}