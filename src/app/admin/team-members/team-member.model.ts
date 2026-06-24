export type MemberRole = 'Lead' | 'Engineer' | 'Analyst' | 'Manager';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
}

export interface TransferState {
  available: TeamMember[]; // ServiceNow assignment group pool
  assigned: TeamMember[]; // Members on the team
}
