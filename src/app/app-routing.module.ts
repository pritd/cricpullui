import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoringComponent } from './components/scoring/scoring.component';
import { ScorebarComponent } from './components/scorebar/scorebar.component';

const routes: Routes = [
  { path: 'first', component: ScoringComponent },
  { path: 'second', component: ScorebarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
