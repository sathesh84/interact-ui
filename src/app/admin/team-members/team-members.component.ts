import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockTeamService } from '../../mock-team.service';
import { TeamMember } from './team-member.model';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [
    CommonModule,   // provides *ngIf, *ngFor, NgClass etc.
    FormsModule,    // provides [(ngModel)] two-way binding on inputs
  ],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss',
})
export class TeamMembersComponent implements OnInit {

  // --- form state ---
  assignmentGroupInput = '';
  fetchStatus: 'idle' | 'loading' | 'ok' | 'empty' = 'idle';
  fetchedGroupName = '';

  // --- page state ---
  isLoading = true;
  isSaving = false;

  // --- data ---
  linkedGroups: string[] = [];          // assignment groups linked to this team
  availableMembers: TeamMember[] = [];  // left pane — fetched from SNOW, not yet on team
  assignedMembers: TeamMember[] = [];   // right pane — current team roster

  // --- filter inputs ---
  availableFilter = '';
  assignedFilter = '';

  // --- selection (which rows the user has clicked/highlighted) ---
  selectedAvailableIds = new Set<string>();
  selectedAssignedIds  = new Set<string>();

  constructor(private teamService: MockTeamService) {}

  // ngOnInit runs once when the component is first shown on screen.
  ngOnInit(): void {
    this.teamService.getAssignedMembers().subscribe(members => {
      this.assignedMembers = members;
      this.isLoading = false;
    });
  }

  // --- getters: filter the lists as the user types ---
  // A getter recalculates every time the template reads it.

  get filteredAvailable(): TeamMember[] {
    const term = this.availableFilter.trim().toLowerCase();
    if (!term) return this.availableMembers;
    return this.availableMembers.filter(m =>
      m.name.toLowerCase().includes(term) || m.email.toLowerCase().includes(term)
    );
  }

  get filteredAssigned(): TeamMember[] {
    const term = this.assignedFilter.trim().toLowerCase();
    if (!term) return this.assignedMembers;
    return this.assignedMembers.filter(m =>
      m.name.toLowerCase().includes(term) || m.email.toLowerCase().includes(term)
    );
  }

  // --- fetch from ServiceNow ---
  fetchFromSnow(): void {
    const group = this.assignmentGroupInput.trim().toUpperCase();
    if (!group) return;

    this.fetchStatus = 'loading';
    this.fetchedGroupName = group;

    this.teamService.fetchMembersByGroup(group).subscribe(members => {
      // Exclude people already on the team (matched by email)
      const assignedEmails = new Set(this.assignedMembers.map(m => m.email));
      this.availableMembers = members.filter(m => !assignedEmails.has(m.email));

      this.fetchStatus = members.length > 0 ? 'ok' : 'empty';

      // Add to linked groups list only if not already there
      if (members.length > 0 && !this.linkedGroups.includes(group)) {
        this.linkedGroups.push(group);
      }
    });
  }

  // --- selection toggle ---
  isAvailableSelected(id: string): boolean { return this.selectedAvailableIds.has(id); }
  isAssignedSelected(id: string):  boolean { return this.selectedAssignedIds.has(id);  }

  toggleAvailable(id: string): void {
    this.selectedAvailableIds.has(id)
      ? this.selectedAvailableIds.delete(id)
      : this.selectedAvailableIds.add(id);
  }

  toggleAssigned(id: string): void {
    this.selectedAssignedIds.has(id)
      ? this.selectedAssignedIds.delete(id)
      : this.selectedAssignedIds.add(id);
  }

  // --- transfer actions ---
  assignSelected(): void {
    const moving = this.availableMembers.filter(m => this.selectedAvailableIds.has(m.id));
    this.assignedMembers  = [...this.assignedMembers, ...moving];
    this.availableMembers = this.availableMembers.filter(m => !this.selectedAvailableIds.has(m.id));
    this.selectedAvailableIds.clear();
  }

  assignAll(): void {
    const moving = this.filteredAvailable;
    const movingIds = new Set(moving.map(m => m.id));
    this.assignedMembers  = [...this.assignedMembers, ...moving];
    this.availableMembers = this.availableMembers.filter(m => !movingIds.has(m.id));
    this.selectedAvailableIds.clear();
  }

  unassignSelected(): void {
    const moving = this.assignedMembers.filter(m => this.selectedAssignedIds.has(m.id));
    this.availableMembers = [...this.availableMembers, ...moving];
    this.assignedMembers  = this.assignedMembers.filter(m => !this.selectedAssignedIds.has(m.id));
    this.selectedAssignedIds.clear();
  }

  unassignAll(): void {
    const moving = this.filteredAssigned;
    const movingIds = new Set(moving.map(m => m.id));
    this.availableMembers = [...this.availableMembers, ...moving];
    this.assignedMembers  = this.assignedMembers.filter(m => !movingIds.has(m.id));
    this.selectedAssignedIds.clear();
  }

  // --- save ---
  save(): void {
    this.isSaving = true;
    this.teamService.saveTeamMembers(this.assignedMembers).subscribe(() => {
      this.isSaving = false;
    });
  }

  // --- helpers ---
  // trackBy helps Angular efficiently re-render only changed rows in *ngFor
  trackById(_index: number, member: TeamMember): string {
    return member.id;
  }

  initials(name: string): string {
    return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  // Returns a CSS class for the avatar colour based on the name
  avatarClass(name: string): string {
    const classes = ['av0', 'av1', 'av2', 'av3', 'av4', 'av5', 'av6'];
    let hash = 0;
    for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
    return classes[hash % classes.length];
  }
}
