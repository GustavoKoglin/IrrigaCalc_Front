import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { IrrigationCalculatorComponent } from './components/irrigation-calculator/irrigation-calculator.component'; 
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'inicio', component: HomeComponent, pathMatch: 'full' },
    { path: 'sobre', component: AboutComponent },
    { path: 'contato', component: ContactComponent },
    { path: 'calcular-custo-irrigacao', component: IrrigationCalculatorComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })], // ⚠️ Ativa Hash
    exports: [RouterModule],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }] // ⚠️ Força Hash
  })
  export class AppRoutingModule { }
