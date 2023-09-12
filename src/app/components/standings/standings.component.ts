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

  constructor(private footballDataService: FootballDataService,private route: ActivatedRoute) { }

  currentSeason = new Date().getFullYear();
  countryName = this.route.snapshot.params.countryName;
  standings = [];

  ngOnInit(): void {

    leagues.response.forEach(res=>{
      if(res.league.name === TopLeagues[this.countryName]){
        this.leagueId = res.league.id;
      }
    })
   
    // this.footballDataService.getStandings(this.leagueId,this.currentSeason).subscribe(results=>{
    //   console.log(results);
    // })

    standings.response.forEach(res=>{
        this.standings = res.league.standings[0];
        console.log(this.standings)
    })
  }

  // showSelectedCountryStandings(country){
  //   let currentSeason = new Date().getFullYear();
  //   let countryName = country.name;
  //   // this.leagueId = this.footballDataService.getLeaguesId(country.code, currentSeason, TopLeagues[countryName], countryName).map(res=>{
  //   //   return res.leagues;
  //   // })

 

  //   console.log(this.leagueId);
    
  // }

}
