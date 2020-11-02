import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
default;
celsius;
descriptions;
info;
celsiusDegrees;
latitude;
longitude;
userLocation: Observable<any>;
apikey;

currentLocation;

  constructor(private weather: WeatherService,private http: HttpClient) { 
    // this.getLocation();
  }

  ngOnInit() {

     //let userLocation = this.http.watchPosition().get(`api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${this.apikey}`);


    this.weather.getDefault().subscribe(data => {

      this.default = data;
      console.log(this.default);

      this.celsius = data.main.feels_like;
      this.celsiusDegrees = this.celsius - 273.15;
      
      
      this.descriptions = this.default['weather'];
      this.info = this.descriptions[0].description;

      if(!navigator.geolocation) {
        console.log('Location is not supported');
      }
      navigator.geolocation.getCurrentPosition((position) => {
       this.latitude = position.coords.latitude;
       this.longitude = position.coords.longitude;
       this.apikey = "e14662c681bb42688af969fe24c84317";

       console.log(this.latitude, this.longitude);
       

       this.userLocation = this.http.get(`api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apikey}`).subscribe(res => {
         console.log(res);
       });
      
      
      return this.userLocation;
        
      })
      
    })

  //    if (this.getLocation()) {
  //   this.getWeather(this.currentLocation) 
  // }

  

  }

 

  // getLocation(): void{
  //   if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position)=>{
  //         const longitude = position.coords.longitude;
  //         const latitude = position.coords.latitude;
  //         this.callApi(longitude, latitude);
  //       });
  //   } else {
  //      console.log("No support for geolocation")
  //   }
  // }

  // callApi(Longitude: number, Latitude: number){
  //   const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
  //   //Call API
  //   console.log(url);
  // }


  // watchPosition(){
  //   let desLat = 0;
  //   let desLon = 0;
  //   let id = navigator.geolocation.watchPosition((position) => {
      
  //   let latitude = position.coords.latitude;
  //   let longitude = position.coords.longitude;

  //     console.log(
  //         `lat: ${this.latitude}, lon: ${this.longitude}`
  //       );
  //       let userLocation = this.http.get(`api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apikey}`);
  //       console.log(userLocation);
        
  //       if(position.coords.latitude == desLat){
  //         navigator.geolocation.clearWatch(id);
  //       }
  //   }, (err) => {
  //     console.log(err);
  //   }, {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0
  //   })
    
  // }


}
