import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TeamMember } from './admin/team-members/team-member.model';

@Injectable({ providedIn: 'root' })
export class MockTeamService {

  // Simulates the ServiceNow assignment group directory.
  // Key = assignment group name, value = list of members in that group.
  private snowDirectory: Record<string, TeamMember[]> = {
    'ADM_SUPPORT': [
      { id: 'u-101', name: 'Aaron Teoh',    email: 'aaron.teoh@bnpparibas.com',    role: 'Engineer' },
      { id: 'u-102', name: 'Karan Mehta',   email: 'karan.mehta@bnpparibas.com',   role: 'Analyst'  },
      { id: 'u-103', name: 'Pranay Kapoor', email: 'pranay.kapoor@bnpparibas.com', role: 'Manager'  },
      { id: 'u-104', name: 'Ravi Sharma',   email: 'ravi.sharma@bnpparibas.com',   role: 'Engineer' },
      { id: 'u-105', name: 'Vikram Patel',  email: 'vikram.patel@bnpparibas.com',  role: 'Lead'     },
      { id: 'u-106', name: 'Mei Lin',       email: 'mei.lin@bnpparibas.com',       role: 'Analyst'  },
      { id: 'u-107', name: 'Daniel Foo',    email: 'daniel.foo@bnpparibas.com',    role: 'Engineer' },
      { id: 'u-108', name: 'Anita Desai',   email: 'anita.desai@bnpparibas.com',   role: 'Engineer' },
    ],
    'AMER_APS': [
      { id: 'u-201', name: 'Tom Becker',  email: 'tom.becker@bnpparibas.com',  role: 'Lead'     },
      { id: 'u-202', name: 'Sara Okafor', email: 'sara.okafor@bnpparibas.com', role: 'Engineer' },
      { id: 'u-203', name: 'Diego Martin',email: 'diego.martin@bnpparibas.com',role: 'Analyst'  },
    ],
    'FX_SUPPORT': [
      { id: 'u-301', name: 'Keiko Tanaka', email: 'keiko.tanaka@bnpparibas.com', role: 'Lead'     },
      { id: 'u-302', name: 'Marcus Webb',  email: 'marcus.webb@bnpparibas.com',  role: 'Engineer' },
    ],
  };

  // Members already on the team when the page first loads.
  private currentTeam: TeamMember[] = [
    { id: 'u-101', name: 'Aaron Teoh',  email: 'aaron.teoh@bnpparibas.com',  role: 'Engineer' },
    { id: 'u-102', name: 'Karan Mehta', email: 'karan.mehta@bnpparibas.com', role: 'Analyst'  },
  ];

  // Fetch members for a given assignment group name (simulates a SNOW API call).
  // delay(650) makes it feel like a real network request.
  fetchMembersByGroup(groupName: string): Observable<TeamMember[]> {
    const members = this.snowDirectory[groupName] ?? [];
    return of(members.map(m => ({ ...m }))).pipe(delay(650));
  }

  // Load the current team members when the page opens.
  getAssignedMembers(): Observable<TeamMember[]> {
    return of(this.currentTeam.map(m => ({ ...m }))).pipe(delay(300));
  }

  // Save the final team roster.
  saveTeamMembers(members: TeamMember[]): Observable<TeamMember[]> {
    return of(members.map(m => ({ ...m }))).pipe(delay(400));
  }
}
