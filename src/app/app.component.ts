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
  scoreList = [];
  showRecord = false;

  playerName = "";
  lastScore = 0;

  game: Game;


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

  async ngOnInit() {
    // this.gameEnd(4);
    this.start();
  }

  start() {
    this.game = new Game();
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
