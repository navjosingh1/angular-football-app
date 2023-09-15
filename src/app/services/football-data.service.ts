import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GeneralConstant } from '../../assets/constant';

@Injectable({
  providedIn: 'root',
})
export class FootballDataService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get(`${environment.API_HOST_URL}/teams/countries`);
  }

  getLeaguesId(countryCode, season, leagueName, countryName) {
    const params = new HttpParams()
      .set('code', countryCode)
      .set('season', season)
      .set('name', leagueName)
      .set('country', countryName);
    return this.http.get(`${environment.API_HOST_URL}/leagues`, {
      params: params,
    });
  }

  getStandings(leagueId, season) {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('season', season);
    return this.http.get(`${environment.API_HOST_URL}/standings`, {
      params: params,
    });
  }

  getfixtures(leagueId, teamId) {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('team', teamId)
      .set('last', GeneralConstant.TEN);
    return this.http.get(`${environment.API_HOST_URL}/fixtures`, {
      params: params,
    });
  }
}
