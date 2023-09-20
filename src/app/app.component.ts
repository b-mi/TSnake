import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { Game } from './game';

declare function myTest(fnc: any): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SNAKE GAME (toroidal)';
  // scoreList = [];
  // showRecord = false;

  btnTitle = 'Score';

  playerName = "";
  lastScore = 0;

  game: Game;
  appleIsLoaded = false;


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.game && !this.game.gameOver) {
      this.game.keyPush(event);
    }

    // this.key = event.key;
  }

  /**
   *
   */
  constructor(private service: AppService) {


  }

  ngOnInit() {
      
  }

  start() {
    this.game = new Game();
    this.btnTitle = 'Score';

    var timer = setInterval(() => {
      this.game.gameLoop();
      console.log('over', this.game.gameOver);

      if (this.game.gameOver) {
        clearInterval(timer);
        this.gameEnd(this.game.scoreNum);
      }
    }, this.game.gameSpeed);
  }

  gameEnd(score) {
    this.lastScore = score;
    if (score > 0) {
      this.btnTitle = 'Save score';
    }
  }

  // async loadScoreList() {
  //   var rtn = await this.service.getSnakeScores();
  //   this.scoreList = rtn.dt as any[];
  // }

  // async saveScore() {
  //   if (!this.playerName) {
  //     this.playerName = 'Little noob';
  //   }
  //   var newScore = { name: this.playerName, score: this.lastScore, created: new Date() };

  //   var rtn = await this.service.putSnakeScore(newScore);
  //   this.scoreList = rtn.dt as any[];

  //   this.lastScore = 0;
  // }

   newGame() {
     this.lastScore = 0;
     location.reload();
   }

  // showScoreList() {
  //   if (this.game) {
  //     this.game.gameOver = true;
  //   }
  //   this.loadScoreList();
  //   this.showRecord = true;
  // }

  appleLoaded(){
    console.log('apll');
    this.appleIsLoaded = true;
    this.start();
  }

}
