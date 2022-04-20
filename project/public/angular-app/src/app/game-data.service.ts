import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './games/games.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private baseUrl = environment.rest_api_base_url;
  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    // let games = [{title: 'catan', price: 30}]
    // return games;

    const url: string = this.baseUrl + '/games';
    return this.http.get<Game[]>(url);
  }

  getGame(gameId: string): Observable<Game> {
    const url: string = this.baseUrl + '/games/' + gameId;
    return this.http.get<Game>(url);
  }

  deleteGame(gameId: string): Observable<any> {
    const url: string = this.baseUrl + '/games/' + gameId;
    return this.http.delete<any>(url);
  }

  addGame(game: {}): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(game);
    console.log('body');
    console.log(body);

    const url: string = this.baseUrl + '/games';
    return this.http.post<any>(url, body, { headers: headers });
  }
}
