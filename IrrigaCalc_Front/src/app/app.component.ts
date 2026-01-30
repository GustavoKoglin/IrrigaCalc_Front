import { Component, Inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'IrrigaCalc';

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.translate.addLangs(['en', 'pt', 'es']);
    this.translate.setDefaultLang('pt');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|pt|es/) ? browserLang : 'pt');
  }

  ngOnInit(): void {
    // Escuta a mudança de idioma para atualizar o SEO
    this.translate.onLangChange.subscribe(() => {
      this.updateTitleAndMeta();
    });

    // Atualiza inicialmente
    this.updateTitleAndMeta();
  }

  private updateTitleAndMeta(): void {
    this.translate.get(['SEO.TITLE', 'SEO.DESCRIPTION', 'SEO.KEYWORDS']).subscribe(res => {
      this.titleService.setTitle(res['SEO.TITLE']);

      this.metaService.updateTag({ name: 'description', content: res['SEO.DESCRIPTION'] });
      this.metaService.updateTag({ name: 'keywords', content: res['SEO.KEYWORDS'] });

      // Open Graph
      this.metaService.updateTag({ property: 'og:title', content: res['SEO.TITLE'] });
      this.metaService.updateTag({ property: 'og:description', content: res['SEO.DESCRIPTION'] });

      // Twitter
      this.metaService.updateTag({ property: 'twitter:title', content: res['SEO.TITLE'] });
      this.metaService.updateTag({ property: 'twitter:description', content: res['SEO.DESCRIPTION'] });

      // Lang attribute on HTML tag
      document.documentElement.lang = this.translate.currentLang === 'en' ? 'en' : (this.translate.currentLang === 'es' ? 'es' : 'pt-BR');
    });
  }
}
