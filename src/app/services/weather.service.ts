import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  userLocation;
  latitude;
  longitude;
  apikey: "e14662c681bb42688af969fe24c84317";

  constructor(private http: HttpClient) { }

  getDefault():Observable<any>{
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?q=Cape%20Town&appid=e14662c681bb42688af969fe24c84317");
  }

  // watchPosition():Observable<any>{
  //  return this.http.get(`api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apikey}`);
  // }


}
