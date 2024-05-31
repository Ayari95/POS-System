import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { Order } from 'src/app/interfaces/commande.iterface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent {
  orders: Order[] = [];
  showDialog: boolean = false;
  order: Order = { id: 0, client_id: 0, product_id: 0, price: 0, inventoryStatus: '', amount: 0, orderDate: new Date() }; // Initialize orderDate
  selectedOrders: any;
  isEdit: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.orders = orders;
        console.log('our orders', this.orders);
      }
    );
  }
  

  openNew(): void {
    this.order = { id: 0, client_id: 0, product_id: 0, price: 0, inventoryStatus: '', amount: 0, orderDate: new Date() }; // Set current date
    this.showDialog = true;
    this.isEdit = false;
  }

  submitOrder(): void {
    if (this.order.id) {
      this.orderService.updateOrder(this.order.id, this.order).subscribe(() => {
        this.getOrders();
        this.showDialog = false;
      });
    } else {
      this.orderService.createOrder(this.order).subscribe(() => {
        this.getOrders();
        this.showDialog = false;
      });
    }
  }

  cancel(): void {
    this.showDialog = false;
  }

  editOrder(order: Order): void {
    this.isEdit = true;
    this.order = { ...order };
    this.showDialog = true;
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
    });
  }

  generatePdf(order: Order): void {
    const doc = new jsPDF();

    // Add logo
    const imgWidth = 40;
    const imgHeight = 20;

    // Add title
    doc.setFontSize(18);
    doc.text('Invoice Details', 105, 30, { align: 'center' });

    // Add header information
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Pos System`, 150, 10);
    doc.text(`Contact: PosSystem@example.com`, 150, 20);
    doc.text(`Date: ${currentDate}`, 150, 30);

    // Draw line below header
    doc.setLineWidth(0.5);
    doc.line(10, 40, 200, 40);

    // Add order details
    doc.setFontSize(14);
    doc.text('Invoice Information:', 10, 50);
    doc.setFontSize(12);
    let yPosition = 60;
    const lineHeight = 10;

    const orderDetails = [
      `Order ID: ${order.id}`,
      `Client ID: ${order.client_id}`,
      `Product ID: ${order.product_id}`,
      `Price: ${order.price}`,
      `Status: ${order.inventoryStatus}`,
      `Amount: ${order.amount}`
    ];

    orderDetails.forEach(detail => {
      doc.text(detail, 10, yPosition);
      yPosition += lineHeight;
    });

    // Add footer information
    doc.setLineWidth(0.5);
    doc.line(10, 270, 200, 270);
    doc.setFontSize(10);
    doc.text('Company Address: 1234 Main Street, Anytown, Anycountry', 10, 280);
    doc.text('Phone: +123 456 7890', 10, 290);
    doc.text('Website: www.example.com', 10, 300);

    // Open PDF in a new tab
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  }
}
