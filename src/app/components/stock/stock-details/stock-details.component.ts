import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent {
  stockForm!: FormGroup;
  stock: Product | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService, // Inject MessageService
    private router: Router // Inject Router

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const productId = Number(id); // Convert id to number
      this.productService.getProductById(productId).subscribe(product => {
        this.stock = product;
        this.stockForm = this.fb.group({
          amount: [product.amount || 0]
        });
      });
    }
  }

  onSubmit() {
    if (this.stockForm.valid && this.stock) {
      const updatedAmount = this.stockForm.get('amount')?.value;
      this.productService.updateProduct(this.stock.id, { ...this.stock, amount: updatedAmount })
        .subscribe(updatedProduct => {
          this.stock = updatedProduct;
          this.messageService.add({severity:'success', summary:'Stock Updated', detail:'Stock amount updated successfully'}); // Display success toast
          console.log('Updated Stock Amount:', updatedAmount);
          setTimeout(() => {
            this.router.navigate(['/stock']); // Redirect to /stock after 1 second
          }, 1000); // Delay for 1 second (1000 milliseconds)
        }, error => {
          this.messageService.add({severity:'error', summary:'Update Failed', detail:'Failed to update stock amount'}); // Display error toast
          console.error('Failed to update stock:', error);
        });
    }
  }
}
