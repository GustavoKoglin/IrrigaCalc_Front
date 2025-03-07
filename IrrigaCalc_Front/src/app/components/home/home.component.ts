import { Component } from '@angular/core';
import { IrrigationCalculatorComponent } from "../irrigation-calculator/irrigation-calculator.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    IrrigationCalculatorComponent,
    AboutComponent,
    ContactComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
