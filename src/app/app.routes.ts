import { Routes } from '@angular/router';
import { TeamMembersComponent } from './admin/team-members/team-members.component';

// Routes tell Angular: "when the URL is X, show component Y"
export const routes: Routes = [
  {
    path: 'admin/team-members',       // URL: http://localhost:4200/admin/team-members
    component: TeamMembersComponent,  // show this component
  },
  {
    path: '',                         // URL: http://localhost:4200/  (home)
    redirectTo: 'admin/team-members', // redirect to team members for now
    pathMatch: 'full',
  },
];
