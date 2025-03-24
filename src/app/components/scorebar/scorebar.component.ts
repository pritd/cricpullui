import { Component, computed, OnInit } from '@angular/core';
import { ScoreBarService } from '../../services/scorebar.service';
import { Summary } from '../../models/ScoreSummary';
import { BallType } from '../../enum/Enums';

@Component({
  selector: 'app-scorebar',
  templateUrl: './scorebar.component.html',
  styleUrl: './scorebar.component.scss'
})
export class ScorebarComponent implements OnInit {

  constructor(private scoreBarService: ScoreBarService) {
   }

   ngOnInit():void {
    this.scoreBarService.connect();    
  }

  summary  =computed(() => {
          // resp = this.scoreBarService.response();
          // if (!resp) return new Summary();
          const fairDeliveries = this.scoreBarService.response().ballByBallSummary.filter(element => element.ballType===BallType.FairDelivery).length
  
          return {...this.scoreBarService.response(),
              ball:fairDeliveries===6?0:fairDeliveries,
          };
        });

}
