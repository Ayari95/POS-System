import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = [];
  showDialog: boolean = false;
  isEditing: boolean = false;
  newProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    category: '',
    rating: 0,
    inventoryStatus: '',
    amount: 0
  };

  constructor(private productService: ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  openNew(): void {
    this.showDialog = true;
    this.isEditing = false;
    this.clearNewProduct();
  }

  openEdit(product: Product): void {
    this.showDialog = true;
    this.isEditing = true;
    this.newProduct = { ...product };
  }

  cancel(): void {
    this.showDialog = false;
    this.clearNewProduct();
  }

  submitProduct(): void {
    if (this.isEditing) {
      this.updateProduct(this.newProduct.id, this.newProduct);
    } else {
      this.createProduct(this.newProduct);
    }
  }

  createProduct(product: Product): void {
    this.productService.createProduct(product).subscribe(() => {
      this.showDialog = false;
      this.loadProducts();
      this.messageService.add({severity:'success', summary:'Success', detail:'Product added successfully.'});
    }, error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add product.'});
    });
  }

  updateProduct(id: number, product: Product): void {
    this.productService.updateProduct(id, product).subscribe(() => {
      this.showDialog = false;
      this.loadProducts();
      this.messageService.add({severity:'success', summary:'Success', detail:'Product updated successfully.'});
    }, error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to update product.'});
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
      this.messageService.add({severity:'success', summary:'Success', detail:'Product deleted successfully.'});
    }, error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to delete product.'});
    });
  }

  deleteSelectedProducts(): void {
    const idsToDelete = this.selectedProducts.map(client => client.id);
    idsToDelete.forEach(id => this.deleteProduct(id));
    this.selectedProducts = [];
  }
  
  getSeverity(inventoryStatus: string): string {
    return inventoryStatus === 'In Stock' ? 'success' : 'warn';
  }

  clearNewProduct(): void {
    this.newProduct = {
      id: 0,
      name: '',
      image: '',
      price: 0,
      category: '',
      rating: 0,
      inventoryStatus: '',
      amount: 0
    };
  }
}