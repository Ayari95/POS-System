import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  showDialog: boolean = false;

  openNew() {
    this.showDialog = true
  }
  
getSeverity(arg0: any): string {
throw new Error('Method not implemented.');
}
loadCarsLazy($event: Event) {
throw new Error('Method not implemented.');
}
virtualProducts: any;


products$: Observable<{ id : number, name: string, amount: number }[]> | undefined;

constructor(private router: Router, private productService: ProductService) { }

ngOnInit(): void {
  this.products$ = this.productService.getAllProducts().pipe(
    map((products: Product[]) => products.map(product => ({ id : product.id , name: product.name, amount: product.amount })))
  );
}

viewDetails(id: number): void {
  this.router.navigate(['/stock', id]);
}

}
