import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { IrrigationCalculatorComponent } from './components/irrigation-calculator/irrigation-calculator.component'; 
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'irrigation-calculator', component: IrrigationCalculatorComponent },
    { path: '**', component: NotFoundComponent }
];
