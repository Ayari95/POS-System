import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.css']
})
export class FactureDetailsComponent implements OnInit {
showDialog: any;
submitFacture() {
throw new Error('Method not implemented.');
}
cancel() {
throw new Error('Method not implemented.');
}
  invoice: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.invoice = {
        id: params['id'],
        customerName: 'John Doe',
        amount: 150.00,
        date: '2024-01-15',
        details: 'Payment for services rendered'
      };
    });
  }
}