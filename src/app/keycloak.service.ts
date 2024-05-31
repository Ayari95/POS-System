import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloakInstance: Keycloak.KeycloakInstance = new Keycloak;

  constructor() {}

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloakInstance = new Keycloak({
        url: 'http://localhost:8180', // URL de votre serveur Keycloak
        realm: 'POS-System', // Nom de votre Realm
        clientId: 'Tritux-client' // ID du client configuré dans Keycloak
      });

      this.keycloakInstance
        .init({ onLoad: 'login-required' })
        .then((authenticated) => {
          resolve(authenticated);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.keycloakInstance) {
        reject('Keycloak non initialisé');
        return;
      } 
        this.keycloakInstance
          .updateToken()
          .then(() => {
            const token = this.keycloakInstance.token;
        if (token) {
          resolve(token);
        } else {
          reject('Token non disponible');
        }
      })
          .catch((error) => {
            reject(error);
          });
      }
    );
  }

  logout(): void {
    this.keycloakInstance.logout();
  }
}
