import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from './app.service';
declare function myTest(fnc: any): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Toroidal snake aka T-HAD';
  scoreList = [];
  showRecord = false;

  playerName = "";
  lastScore = 0;

  @Output() gameOverEvent = new EventEmitter();

  /**
   *
   */
  constructor(private service: AppService) {


  }

  async ngOnInit() {
    // this.gameEnd(4);
    this.start();
  }

  start() {

    const goe = this.gameOverEvent.subscribe(r => {
      // goe.unsubscribe();
      this.gameEnd(r.score);
    });
    myTest(this.gameOverEvent);
  }

  gameEnd(score) {
    this.lastScore = score;
  }

  async loadScoreList() {
    var rtn = await this.service.getSnakeScores();
    this.scoreList = rtn.dt as any[];
  }

  async saveScore() {
    if (!this.playerName) {
      this.playerName = 'Little noob';
    }
    var newScore = { name: this.playerName, score: this.lastScore, created: new Date() };

    var rtn = await this.service.putSnakeScore(newScore);
    this.scoreList = rtn.dt as any[];

    this.lastScore = 0;
  }

  cancel() {
    this.lastScore = 0;
    this.showRecord = false;
    location.reload();
  }

  showScoreList() {
    this.loadScoreList();
    this.showRecord = true;
  }

}
