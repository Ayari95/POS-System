import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];
  selectedClients: Client[] = [];
  showDialog: boolean = false;
  newClient: Client = { id: 0, name: '', email: '', phone: '' , orders : []};
  isEdit: boolean = false;
caissier: any;

  constructor(private clientService: ClientService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.getAllClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch clients.' });
      }
    );
  }

  addClient(): void {
    this.clientService.addClient(this.newClient).subscribe(
      (client: Client) => {
        this.clients.push(client);
        this.showDialog = false;
        this.newClient = { id: 0, name: '', email: '', phone: '' , orders : [] };
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client added successfully.' });
      },
      (error) => {
        console.error('Error adding client:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add client.' });
      }
    );
  }

  updateClient(): void {
    this.clientService.updateClient(this.newClient).subscribe(
      (updatedClient: Client) => {
        const index = this.clients.findIndex(client => client.id === updatedClient.id);
        if (index !== -1) {
          this.clients[index] = updatedClient;
        }
        this.showDialog = false;
        this.newClient = { id: 0, name: '', email: '', phone: '' , orders : [] };
        this.isEdit = false;
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Client updated successfully.' });
      },
      (error) => {
        console.error('Error updating client:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update client.' });
      }
    );
  }

  deleteClient(idClient: number): void {
    this.clientService.deleteClient(idClient).subscribe(
      () => {
        this.clients = this.clients.filter(client => client.id !== idClient);
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Client deleted successfully.' });
      },
      error => {
        console.error(`Error deleting client with id ${idClient}: `, error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to delete client with id ${idClient}.` });
      }
    );
  }

  deleteSelectedClients(): void {
    const idsToDelete = this.selectedClients.map(client => client.id);
    idsToDelete.forEach(id => this.deleteClient(id));
    this.selectedClients = [];
  }

  openNew(): void {
    this.newClient = { id: 0, name: '', email: '', phone: '' , orders : [] };
    this.isEdit = false;
    this.showDialog = true;
  }

  editClient(client: Client): void {
    this.newClient = { ...client };
    this.isEdit = true;
    this.showDialog = true;
  }

  cancel(): void {
    this.showDialog = false;
    this.isEdit = false;
  }

  submitForm(): void {
    if (this.isEdit) {
      this.updateClient();
    } else {
      this.addClient();
    }
  }
}