import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballDataService } from '../../services/football-data.service';
import { Fixtures } from '../../interfaces/fixtures';
import { CommonChecksService } from '../../services/common-checks.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  fixtures: Fixtures[];
  loading: boolean;
  errorMessage: string = '';

  constructor(
    private footballDataService: FootballDataService,
    private route: ActivatedRoute,
    private commonCheckService: CommonChecksService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    let teamId = this.route.snapshot.params.teamId;
    let selectedCountry = JSON.parse(localStorage.getItem('selectedCountry'));
    let leagueId =
      JSON.parse(localStorage.getItem(`TopleagueId_${selectedCountry.name}`)) ||
      null;

    if (this.commonCheckService.isNotNull(leagueId)) {
      this.footballDataService.getfixtures(leagueId, teamId).subscribe(
        (data) => {
          this.loading = false;
          this.fixtures = data['response'];
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
