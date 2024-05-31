/*import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
*/

import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isAuthenticated: boolean = false;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.keycloakService.init().then((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  login(): void {
    this.keycloakService.init().then((authenticated) => {
      if (authenticated) {
        console.log('Authenticated');
        this.isAuthenticated = true;
      } else {
        console.log('Not authenticated');
      }
    });
  }

  logout(): void {
    this.keycloakService.logout();
    this.isAuthenticated = false;
  }
}
