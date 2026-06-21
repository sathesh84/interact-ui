import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,        // enables routerLink="..." on anchor tags
    RouterLinkActive,  // enables routerLinkActive="active" — adds class when URL matches
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  // inject(Router) gives us access to the Angular Router service.
  // A "service" is a shared object that Angular creates once and gives to any component that asks.
  // The Router service knows the current URL and lets us navigate programmatically.
  private router = inject(Router);

  // computed() creates a value that automatically recalculates when its dependencies change.
  // Here: whenever the URL changes, "mode" is recalculated.
  // If the URL starts with "/admin", mode = 'admin', otherwise mode = 'portal'.
  mode = computed(() =>
    this.router.url.startsWith('/admin') ? 'admin' : 'portal'
  );
}
