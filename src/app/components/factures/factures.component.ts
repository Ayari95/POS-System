import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit {
showDialog: any;

selectedFactures: any;

cancel() {
  this.showDialog = false;
}
submitFacture() {
throw new Error('Method not implemented.');
}
openNew() {
  this.showDialog = true
}
  invoices = [
    { id: 1, customerName: 'Ayari', amount: 150.00, date: '2024-01-15' },
    { id: 2, customerName: 'Jhon' , amount: 250.00, date: '2024-01-20' },
    { id: 3, customerName: 'Montahe', amount: 180.00, date: '2024-01-15' },
    { id: 4, customerName: 'Ela', amount: 200.00, date: '2024-01-20' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
   // this.router.navigate(['billing/1']);
  }
deleteProduct(arg0: any) {
  throw new Error('Method not implemented.');
  }
  editProduct(_t6: any) {
  throw new Error('Method not implemented.');
  }
  addProduct() {
  throw new Error('Method not implemented.');
  }

  viewDetails(id: number): void {
    this.router.navigate(['/facture', id]);
  }
  
}
