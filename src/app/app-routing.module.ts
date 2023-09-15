import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandingsComponent } from './components/standings/standings.component';
import { TeamsComponent } from './components/teams/teams.component';

const routes: Routes = [
  {
    path: '',
    component: StandingsComponent,
  },
  {
    path: 'teams/:teamId',
    component: TeamsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
