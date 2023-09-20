import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // https://arxa.eu/rootapi/api/snake/scores/
  
  readonly baseUrl = 'https://arxa.eu/rootapi/api';
  // readonly baseUrl = 'http://localhost:63246/api';
  constructor(private http: HttpClient) { }


  // async getSnakeScores() {
  //   return await this.http.get<any>(`${this.baseUrl}/snake/scores`).toPromise();
  // }

  // async putSnakeScore(newScore: { name: string; score: number; created: Date; }) {
  //   return await this.http.put<any>(`${this.baseUrl}/snake/putScore`, newScore).toPromise();
  // }

}
