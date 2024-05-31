import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ClientComponent } from './components/client/client.component';
import { StockComponent } from './components/stock/stock.component';
import { CommandesComponent } from './components/commandes/commandes.component';
import { FacturesComponent } from './components/factures/factures.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CaissierComponent } from './components/caissier/caissier.component';
import { StockDetailsComponent } from './components/stock/stock-details/stock-details.component';
import { HomeComponent } from './components/home/home.component';
import { FactureDetailsComponent } from './components/factures/facture-details/facture-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent } ,
  { path: 'products', component: ProductComponent } ,
  { path: 'clients', component: ClientComponent } ,
  { path: 'stock', component: StockComponent } ,
  { path: 'commandes', component: CommandesComponent } ,
  { path: 'factures', component: FacturesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'caissier', component: CaissierComponent },
  { path: 'stock/:id', component: StockDetailsComponent },
  { path: 'facture/:id', component: FactureDetailsComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
