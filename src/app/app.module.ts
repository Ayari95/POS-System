import { APP_INITIALIZER, NgModule, isStandalone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenubarModule } from 'primeng/menubar';
import { ProductComponent } from './components/product/product.component';
import { ClientComponent } from './components/client/client.component';
import { StockComponent } from './components/stock/stock.component';
import { CommandesComponent } from './components/commandes/commandes.component';
import { FacturesComponent } from './components/factures/factures.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CaissierComponent } from './components/caissier/caissier.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card'
import { ChartModule } from 'primeng/chart';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { StockDetailsComponent } from './components/stock/stock-details/stock-details.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HomeComponent } from './components/home/home.component';
import { GalleriaModule } from 'primeng/galleria'
import { KeycloakService } from 'keycloak-angular';
import { FactureDetailsComponent } from './components/factures/facture-details/facture-details.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductComponent,
    ClientComponent,
    StockComponent,
    CommandesComponent,
    FacturesComponent,
    DashboardComponent,
    CaissierComponent,
    StockDetailsComponent,
    HomeComponent,
    FactureDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    InputTextModule,
    ToastModule,
    RippleModule,
    TagModule,
    RatingModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    ChartModule,
    VirtualScrollerModule,
    ReactiveFormsModule,
    DialogModule,
    BrowserAnimationsModule,
    CheckboxModule,
    RadioButtonModule,
    GalleriaModule,
    RouterModule
  ],
  providers: [MessageService,HttpClientModule, KeycloakService],
  bootstrap: [AppComponent]
})
export class AppModule { }


