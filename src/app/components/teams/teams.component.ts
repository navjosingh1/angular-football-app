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
  teamId: number;

  constructor(
    private footballDataService: FootballDataService,
    private route: ActivatedRoute,
    private commonCheckService: CommonChecksService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.teamId = params['teamId'];
    });
    let selectedCountry = JSON.parse(sessionStorage.getItem('selectedCountry'));
    let leagueId =
      JSON.parse(
        sessionStorage.getItem(`TopleagueId_${selectedCountry.name}`)
      ) || null;

    if (this.commonCheckService.isNotNull(leagueId)) {
      this.footballDataService.getfixtures(leagueId, this.teamId).subscribe(
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
