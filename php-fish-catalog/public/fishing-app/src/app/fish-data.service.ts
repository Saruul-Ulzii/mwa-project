import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Distribution, Fish } from './fishes/fishes.component';

@Injectable({
  providedIn: 'root',
})
export class FishDataService {
  base_url: String = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getFishes(): Observable<Fish[]> {
    return this.http.get<Fish[]>(this.base_url + '/fishes');
  }
  getFish(fishId: string): Observable<Fish> {
    return this.http.get<Fish>(this.base_url + '/fishes/' + fishId);
  }
  addFish(fishToAdd: Fish): Observable<Fish> {
    console.log('fish adding', fishToAdd);

    return this.http.post<Fish>(this.base_url + '/fishes', fishToAdd);
  }
  addDist(fishId: string, dist: Distribution) {
    return this.http.post<Fish>(
      this.base_url + '/fishes' + fishId + '/dist',
      dist
    );
  }
  updateFish(fishToUpdate: Fish): Observable<Fish> {
    console.log('update fish', fishToUpdate);
    console.log('update fish id', fishToUpdate._id);

    return this.http.put<Fish>(
      this.base_url + '/fishes/' + fishToUpdate._id,
      fishToUpdate
    );
  }
  deleteFish(fishId: String): Observable<any> {
    return this.http.delete<any>(this.base_url + '/fishes/' + fishId);
  }
}
