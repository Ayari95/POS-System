import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Caissier } from 'src/app/interfaces/caissier.interface';
import { CaissierService } from 'src/app/services/caissier.service';

@Component({
  selector: 'app-caissier',
  templateUrl: './caissier.component.html',
  styleUrls: ['./caissier.component.css']
})
export class CaissierComponent {

  caissiers: Caissier [] = [];
  selectedCaissiers: Caissier[] = [];
  showDialog: boolean = false;
  newCaissier: Caissier = { id: 0, name: '', email: '', phone: '', role : '' };
  isEdit: boolean = false;

  constructor(private caissierService: CaissierService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchCaissiers();
  }

  fetchCaissiers(): void {
    this.caissierService.getAllCaissier().subscribe(
      (data: Caissier[]) => {
        this.caissiers = data;
      },
      (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch caissiers.' });
      }
    );
  }

  addCaissier(): void {
    this.caissierService.addCaissier(this.newCaissier).subscribe(
      (caissier: Caissier) => {
        this.caissiers.push(caissier);
        this.showDialog = false;
        this.newCaissier = { id: 0, name: '', email: '', phone: '', role : '' };
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Caissier added successfully.' });
      },
      (error) => {
        console.error('Error adding Caissier:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Caissier.' });
      }
    );
  }

  updateCaissier(): void {
    this.caissierService.updateCaissier(this.newCaissier).subscribe(
      (updatedCaissier: Caissier) => {
        const index = this.caissiers.findIndex(caissier => caissier.id === updatedCaissier.id);
        if (index !== -1) {
          this.caissiers[index] = updatedCaissier;
        }
        this.showDialog = false;
        this.newCaissier = { id: 0, name: '', email: '', phone: '' , role : ''  };
        this.isEdit = false;
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Caissier updated successfully.' });
      },
      (error) => {
        console.error('Error updating Caissier:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Caissier.' });
      }
    );
  }

  deleteCaissier(idCaissier: number): void {
    this.caissierService.deleteCaissier(idCaissier).subscribe(
      () => {
        this.caissiers = this.caissiers.filter(Caissier => Caissier.id !== idCaissier);
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Caissier deleted successfully.' });
      },
      error => {
        console.error(`Error deleting Caissier with id ${idCaissier}: `, error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to delete caissier with id ${idCaissier}.` });
      }
    );
  }

  deleteSelectedCaissiers(): void {
    const idsToDelete = this.selectedCaissiers.map(Caissier => Caissier.id);
    idsToDelete.forEach(id => this.deleteCaissier(id));
    this.selectedCaissiers = [];
  }

  openNew(): void {
    this.newCaissier = { id: 0, name: '', email: '', phone: '' , role : '' };
    this.isEdit = false;
    this.showDialog = true;
  }

  editCaissier(Caissier: Caissier): void {
    this.newCaissier = { ...Caissier };
    this.isEdit = true;
    this.showDialog = true;
  }

  cancel(): void {
    this.showDialog = false;
    this.isEdit = false;
  }

  submitForm(): void {
    if (this.isEdit) {
      this.updateCaissier();
    } else {
      this.addCaissier();
    }
  }
}