import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Nav } from './layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,  // renders the current page inside <router-outlet>
    Header,        // <app-header>
    Nav,           // <app-nav>
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
