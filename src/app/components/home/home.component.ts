import { Component, OnInit } from '@angular/core';
import { FootballDataService } from '../../services/football-data.service';
import { TopLeagues } from '../../../constant';
import {leagues} from '../../../app/league';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countriesList: Array<object>;
  leagueId : number;
  constructor(private footballDataService: FootballDataService) { }

  ngOnInit(): void {
    this.countriesList = this.footballDataService.getCountries().filter(country => {
        return Object.keys(TopLeagues).indexOf(country.name) !== -1;
    });
  }
  
}
