import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { IrrigationCalculatorComponent } from "./components/irrigation-calculator/irrigation-calculator.component";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'IrrigaCalc';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'pt', 'es']);
    this.translate.setDefaultLang('pt');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|pt|es/) ? browserLang : 'pt');
  }
}
