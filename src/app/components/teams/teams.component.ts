import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballDataService } from 'src/app/services/football-data.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  fixtures;
  teamId = this.route.snapshot.params.teamId;
  constructor(private footballDataService : FootballDataService,private route: ActivatedRoute) { }

  currentSeason = new Date().getFullYear();
  ngOnInit(): void {
    let leagueId = localStorage.getItem('leagueId');
    this.fixtures = this.footballDataService.getfixtures(this.currentSeason,leagueId,this.teamId);
    console.log(this.fixtures);
  }

}
