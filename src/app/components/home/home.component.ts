import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  images: any[] = [];
showDialog: any;
  visible: true = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/home.PNG', { responseType: 'blob' })
      .subscribe(blob => {
        this.images.push({ itemImageSrc: URL.createObjectURL(blob) });
      });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}}