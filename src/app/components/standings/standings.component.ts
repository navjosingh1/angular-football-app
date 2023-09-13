import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { leagues } from 'src/app/league';
import { standings } from 'src/app/components/standings/standings'
import { FootballDataService } from 'src/app/services/football-data.service';
import { Standings } from '../../interfaces/standings';
import { TopLeagues } from 'src/constant';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  leagueId: number;
  leagueData;
  standingsData;

  constructor(private footballDataService: FootballDataService,private route: ActivatedRoute) { }

  currentSeason = new Date().getFullYear();
  countryName = this.route.snapshot.params.countryName;
  standings = [];
  leagueName = TopLeagues[this.countryName];

  ngOnInit(): void {

    let country = JSON.parse(localStorage.getItem('country'));

    if(country){
      this.leagueData = this.footballDataService.getLeaguesId(country.code, this.currentSeason, this.leagueName , this.countryName);
      this.leagueId = this.leagueData[0].league.id;
      localStorage.setItem('leagueId', JSON.stringify(this.leagueId));
      this.getStandings();
    }
  }

  getStandings(){
    this.standings = this.footballDataService.getStandings(this.leagueId,this.currentSeason);
  }

}
