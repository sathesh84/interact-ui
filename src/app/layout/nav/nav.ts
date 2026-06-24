import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,       // enables routerLink="..." on anchor tags
    RouterLinkActive, // adds CSS class when link URL matches current URL
    NgIf,             // enables *ngIf in the template
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  // constructor injection — Angular gives us the Router when this component is created
  constructor(private router: Router) {}

  // A getter is a property that runs a function every time it is read.
  // Here: checks the current URL and returns 'admin' or 'portal'.
  get mode(): string {
    return this.router.url.startsWith('/admin') ? 'admin' : 'portal';
  }
}
