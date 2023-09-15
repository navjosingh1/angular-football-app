import { Component, OnInit } from '@angular/core';
import { FootballDataService } from '../../services/football-data.service';
import { Country } from '../../interfaces/country';
import { Standings } from '../../interfaces/standings';
import { TopEuropeanLeagues, StandingsConst } from '../../../assets/constant';
import { CommonChecksService } from '../../services/common-checks.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit {
  countriesList: Country[] = [];
  selectedCountryName: string;
  errorMessage = '';
  leagueStandingsList: Standings[] = [];
  selectedCountry: Country;

  readonly STANDING_CONSTANT = StandingsConst;
  currentSeason: number = new Date().getFullYear();

  constructor(
    private footballDataService: FootballDataService,
    private commonChecksService: CommonChecksService
  ) {}

  ngOnInit(): void {
    let countries = JSON.parse(window.localStorage.getItem('countries')) || [];
    if (this.commonChecksService.isPopulatedArray(countries)) {
      this.countriesList = countries;
      this.loadLeagueStandings();
    } else {
      this.getTopLeagueCountries();
    }
  }

  /**
   * get Top Leagues Countries List
   */
  getTopLeagueCountries() {
    this.footballDataService.getCountries().subscribe(
      (data) => {
        this.countriesList = data['response'].filter((country: Country) => {
          return Object.keys(TopEuropeanLeagues).indexOf(country.name) !== -1;
        });
        localStorage.setItem('countries', JSON.stringify(this.countriesList));
        this.loadLeagueStandings();
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  /**
   * load initial league standings
   */
  loadLeagueStandings() {
    let selectedCountryItem =
      JSON.parse(localStorage.getItem('selectedCountry')) || null;
    if (this.commonChecksService.isNotNull(selectedCountryItem)) {
      this.selectedCountry = selectedCountryItem
        ? selectedCountryItem
        : this.countriesList[0];
      localStorage.setItem(
        'selectedCountry',
        JSON.stringify(this.selectedCountry)
      );
      this.getCountriesData(this.selectedCountry);
    }
  }

  /**
   * call getLeaguesId() of service & store leagueID
   * @param country
   */
  getCountriesData(country: Country) {
    if (country) {
      this.selectedCountryName = country?.name;

      this.selectedCountry = country;
      localStorage.setItem(
        'selectedCountry',
        JSON.stringify(this.selectedCountry)
      );

      let leagueLocalId =
        JSON.parse(localStorage.getItem(`TopleagueId_${country.name}`)) || null;

      if (this.commonChecksService.isNotNull(leagueLocalId)) {
        this.getStandings(leagueLocalId, this.currentSeason);
      } else {
        this.getLeagueId(country, leagueLocalId);
      }
    }
  }

  /**
   * getting league Id based on selected country name & code
   * @param country
   * @param leagueLocalId
   */
  getLeagueId(country: Country, leagueLocalId: number) {
    let leagueName = TopEuropeanLeagues[country.name];
    this.footballDataService
      .getLeaguesId(country.code, this.currentSeason, leagueName, country.name)
      .subscribe(
        (data) => {
          leagueLocalId = data['response'][0]?.league.id;
          localStorage.setItem(
            `TopleagueId_${country.name}`,
            JSON.stringify(leagueLocalId)
          );
          this.getStandings(leagueLocalId, this.currentSeason);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  /**
   * get leagues standings data on basis of leagueID & current season
   * @param leagueId
   * @param currentSeason
   */
  getStandings(leagueId: number, currentSeason: number) {
    let standingsData =
      JSON.parse(
        window.localStorage.getItem(`standings_${this.selectedCountry.name}`)
      ) || [];

    if (this.commonChecksService.isPopulatedArray(standingsData)) {
      this.leagueStandingsList = standingsData;
    } else {
      this.footballDataService.getStandings(leagueId, currentSeason).subscribe(
        (data) => {
          if (this.commonChecksService.isPopulatedArray(data['response'])) {
            this.leagueStandingsList =
              data['response'][0]?.league?.standings[0];
            localStorage.setItem(
              `standings_${this.selectedCountry.name}`,
              JSON.stringify(this.leagueStandingsList)
            );
          }
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
