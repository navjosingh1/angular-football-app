import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {

  constructor(private http: HttpClient) { }

  getCountries(){
    let countries = JSON.parse(window.localStorage.getItem('countries'));
    if(countries){
      return countries;
    }else{
      this.http.get(`${environment.API_HOST_URL}/countries`).subscribe(data=>{
         window.localStorage.setItem('countries', JSON.stringify(data['response']));
        }
      );
    }
    // return this.http.get(`${environment.API_HOST_URL}/countries`);
  }

  getLeaguesId(countryCode,season,leagueName,countryName){
    let leagues = JSON.parse(window.localStorage.getItem('leagues'));
    if(leagues){
      return leagues;
    }else{
      const params = new HttpParams()
      .set('code',countryCode)
      .set('season',season)
      .set('name',leagueName)
      .set('country',countryName);
      this.http.get(`${environment.API_HOST_URL}/leagues`,{params: params}).subscribe(data=>{
         window.localStorage.setItem('leagues', JSON.stringify(data['response']));
        }
      );
    }
    // const params = new HttpParams()
    // .set('code',countryCode)
    // .set('season',season)
    // .set('name',leagueName)
    // .set('country',countryName);
    // return this.http.get(`${environment.API_HOST_URL}/leagues`,{params: params});
  }

  getStandings(leagueId,season){
    let standings = JSON.parse(window.localStorage.getItem('standings'));
    if(standings){
      return standings.standings[0];

    }else{
      const params = new HttpParams()
      .set('league', leagueId)
      .set('season',season);
      this.http.get(`${environment.API_HOST_URL}/standings`,{params: params}).subscribe(data=>{
         window.localStorage.setItem('standings', JSON.stringify(data['response'][0].league));
        }
      );
  }}

  getfixtures(currentSeason,leagueId,teamId){
    let fixtures = JSON.parse(window.localStorage.getItem('fixtures'));
    if(fixtures){
      return fixtures;

    }else{
      const params = new HttpParams()
      .set('league',leagueId)
      .set('season',currentSeason)
      .set('team', teamId);
      this.http.get(`${environment.API_HOST_URL}/fixtures`,{params: params}).subscribe(data=>{
         window.localStorage.setItem('fixtures', JSON.stringify(data['response']));
        }
      );
      }}
}
