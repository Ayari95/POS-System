import { Component } from '@angular/core';
import { KeycloakService } from '../../keycloak.service';
import { MenuItem } from 'src/app/interfaces/menuItem.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  items: MenuItem[] = [];
  isAuthenticated: boolean = false;


  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.items = [
      { label: 'Home', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Clients', url: '/clients' },
      { label: 'Stock', url: '/stock' },
      { label: 'Orders', url: '/commandes' },
      { label: 'Cashier', url: '/caissier' },
      { label: 'Dashboard', url: '/dashboard' }
    ];
  }

  logout(): void {
    this.keycloakService.logout();
    this.isAuthenticated = false;
  }



}
