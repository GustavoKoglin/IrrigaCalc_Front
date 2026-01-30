import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-irrigation-calculator',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  templateUrl: './irrigation-calculator.component.html',
  styleUrls: ['./irrigation-calculator.component.scss']
})
export class IrrigationCalculatorComponent {

  constructor(private translate: TranslateService) { }

  resultLitros: string = '';
  resultCusto: string = '';
  unidadeArea: string = 'selecione';
  area: string = '';
  categoriaSelecionada: keyof typeof this.CULTURAS = 'frutas';
  culturasDisponiveis: string[] = [];
  tipoSoloSelecionado: keyof typeof this.SOLO_FACTORS = 'arenoso';
  culturaSelecionada: string = '';
  estagioDesenvolvimento: string = 'desenvolvimento';
  eTo: number = 5;

  // Constantes
  readonly CUSTO_M3_AGUA = 2.50;
  readonly EFICIENCIA_IRRIGACAO = 0.85;
  readonly HECTARE_PARA_M2 = 10000;

  // Mapeamento completo de culturas
  readonly CULTURAS = {
    frutas: [
      'Abacate', 'Abacaxi', 'Açaí', 'Acerola', 'Ameixa', 'Amora', 'Banana', 'Caju',
      'Caqui', 'Carambola', 'Cereja', 'Figo', 'Framboesa', 'Goiaba', 'Graviola', 'Jabuticaba',
      'Jaca', 'Kiwi', 'Laranja', 'Limão', 'Maçã', 'Mamão', 'Manga', 'Maracujá',
      'Melancia', 'Melão', 'Morango', 'Nêspera', 'Pera', 'Pêssego', 'Romã', 'Tangerina', 'Uva'
    ],
    hortalicas: [
      'Alho-poró', 'Cebolinha', 'Coentro', 'Salsa', 'Cebolinha-verde', 'Manjericão', 'Hortelã',
      'Salsão', 'Orégano', 'Alecrim'
    ],
    graos: [
      'Arroz', 'Feijão', 'Milho', 'Soja', 'Trigo', 'Sorgo', 'Cevada', 'Aveia', 'Lentilha', 'Grão-de-bico',
      'Ervilha', 'Amendoim', 'Quinoa', 'Painço', 'Café'
    ],
    legumes: [
      'Abóbora', 'Abobrinha', 'Batata', 'Batata-doce', 'Berinjela', 'Beterraba',
      'Cenoura', 'Chuchu', 'Inhame', 'Mandioquinha', 'Mandioca', 'Pepino', 'Pimentão', 'Quiabo', 'Tomate', 'Vagem'
    ],
    verduras: [
      'Agrião', 'Alface', 'Almeirão', 'Catalonha', 'Chicória', 'Couve', 'Couve-flor',
      'Espinafre', 'Rúcula', 'Repolho', 'Mostarda', 'Acelga'
    ],
    outros: [
      'Cana-de-açúcar', 'Girassol', 'Algodão', 'Mamona', 'Cacau', 'Fumo',
      'Pimenta-do-reino', 'Erva-mate', 'Palmeira', 'Borracha (seringueira)', 'Oliveira'
    ]
  };

  // Valores base de Kc para todas as culturas (inicial, desenvolvimento, intermediário, final)
  readonly KC_BASE: Record<string, number[]> = {
    // Frutas
    'Abacate': [0.65, 1.05, 1.10, 0.85],
    'Abacaxi': [0.50, 0.90, 0.85, 0.60],
    'Açaí': [0.70, 1.10, 1.05, 0.80],
    'Acerola': [0.55, 0.95, 0.90, 0.65],
    'Ameixa': [0.60, 1.00, 0.95, 0.70],
    'Amora': [0.60, 1.05, 1.00, 0.75],
    'Banana': [0.75, 1.15, 1.20, 0.90],
    'Caju': [0.60, 1.00, 0.95, 0.70],
    'Caqui': [0.60, 1.05, 1.00, 0.75],
    'Carambola': [0.65, 1.05, 1.00, 0.80],
    'Cereja': [0.60, 1.00, 0.95, 0.70],
    'Figo': [0.60, 1.05, 1.00, 0.75],
    'Framboesa': [0.65, 1.05, 1.00, 0.80],
    'Goiaba': [0.65, 1.10, 1.05, 0.80],
    'Graviola': [0.70, 1.10, 1.05, 0.85],
    'Jabuticaba': [0.65, 1.05, 1.00, 0.80],
    'Jaca': [0.70, 1.10, 1.05, 0.85],
    'Kiwi': [0.65, 1.05, 1.00, 0.80],
    'Laranja': [0.60, 0.95, 1.00, 0.70],
    'Limão': [0.60, 0.95, 1.00, 0.70],
    'Maçã': [0.55, 0.90, 1.00, 0.65],
    'Mamão': [0.65, 1.05, 1.10, 0.85],
    'Manga': [0.60, 1.00, 1.10, 0.75],
    'Maracujá': [0.60, 1.05, 1.15, 0.80],
    'Melancia': [0.50, 1.00, 0.95, 0.65],
    'Melão': [0.55, 1.05, 1.00, 0.70],
    'Morango': [0.60, 1.10, 1.05, 0.75],
    'Nêspera': [0.60, 1.00, 0.95, 0.70],
    'Pera': [0.60, 1.00, 0.95, 0.70],
    'Pêssego': [0.60, 1.05, 1.00, 0.75],
    'Romã': [0.60, 1.00, 0.95, 0.70],
    'Tangerina': [0.60, 0.95, 1.00, 0.70],
    'Uva': [0.45, 0.85, 0.95, 0.60],

    // Hortaliças
    'Alho-poró': [0.70, 1.10, 1.05, 0.80],
    'Cebolinha': [0.70, 1.10, 1.00, 0.80],
    'Coentro': [0.75, 1.15, 1.05, 0.85],
    'Salsa': [0.75, 1.15, 1.05, 0.85],
    'Cebolinha-verde': [0.70, 1.10, 1.00, 0.80],
    'Manjericão': [0.75, 1.15, 1.05, 0.85],
    'Hortelã': [0.75, 1.15, 1.05, 0.85],
    'Salsão': [0.70, 1.10, 1.05, 0.80],
    'Orégano': [0.70, 1.10, 1.05, 0.80],
    'Alecrim': [0.65, 1.05, 1.00, 0.75],

    // Grãos
    'Arroz': [1.10, 1.50, 1.30, 0.80],
    'Feijão': [0.35, 1.10, 1.05, 0.45],
    'Milho': [0.30, 1.20, 1.15, 0.60],
    'Soja': [0.40, 1.15, 1.10, 0.50],
    'Trigo': [0.70, 1.10, 1.00, 0.40],
    'Sorgo': [0.60, 1.10, 1.00, 0.50],
    'Cevada': [0.70, 1.20, 1.10, 0.50],
    'Aveia': [0.70, 1.15, 1.05, 0.50],
    'Lentilha': [0.40, 1.10, 1.05, 0.50],
    'Grão-de-bico': [0.40, 1.10, 1.05, 0.50],
    'Ervilha': [0.40, 1.10, 1.05, 0.50],
    'Amendoim': [0.50, 1.10, 1.05, 0.60],
    'Quinoa': [0.50, 1.10, 1.05, 0.60],
    'Painço': [0.50, 1.10, 1.05, 0.60],
    'Café': [0.60, 1.00, 1.00, 0.80],

    // Legumes
    'Abóbora': [0.50, 1.10, 1.00, 0.70],
    'Abobrinha': [0.60, 1.10, 1.05, 0.75],
    'Batata': [0.50, 1.10, 1.00, 0.70],
    'Batata-doce': [0.50, 1.10, 1.00, 0.70],
    'Berinjela': [0.60, 1.15, 1.10, 0.80],
    'Beterraba': [0.60, 1.10, 1.05, 0.75],
    'Cenoura': [0.65, 1.10, 1.05, 0.75],
    'Chuchu': [0.60, 1.10, 1.05, 0.75],
    'Inhame': [0.55, 1.05, 1.00, 0.70],
    'Mandioquinha': [0.55, 1.05, 1.00, 0.70],
    'Mandioca': [0.45, 1.00, 0.95, 0.60],
    'Pepino': [0.60, 1.15, 1.10, 0.80],
    'Pimentão': [0.60, 1.15, 1.10, 0.80],
    'Quiabo': [0.55, 1.10, 1.05, 0.75],
    'Tomate': [0.60, 1.20, 1.25, 0.85],
    'Vagem': [0.60, 1.10, 1.05, 0.75],

    // Verduras
    'Agrião': [0.75, 1.15, 1.05, 0.85],
    'Alface': [0.80, 1.20, 1.15, 0.90],
    'Almeirão': [0.75, 1.15, 1.05, 0.85],
    'Catalonha': [0.75, 1.15, 1.05, 0.85],
    'Chicória': [0.75, 1.15, 1.05, 0.85],
    'Couve': [0.70, 1.10, 1.05, 0.80],
    'Couve-flor': [0.70, 1.10, 1.05, 0.80],
    'Espinafre': [0.70, 1.10, 1.00, 0.80],
    'Rúcula': [0.75, 1.15, 1.05, 0.85],
    'Repolho': [0.70, 1.10, 1.05, 0.80],
    'Mostarda': [0.75, 1.15, 1.05, 0.85],
    'Acelga': [0.70, 1.10, 1.05, 0.80],

    // Outros
    'Cana-de-açúcar': [0.40, 1.20, 1.10, 0.70],
    'Girassol': [0.50, 1.10, 1.00, 0.60],
    'Algodão': [0.50, 1.30, 1.20, 0.60],
    'Mamona': [0.50, 1.10, 1.00, 0.60],
    'Cacau': [0.70, 1.10, 1.05, 0.85],
    'Fumo': [0.50, 1.10, 1.00, 0.60],
    'Pimenta-do-reino': [0.60, 1.10, 1.05, 0.75],
    'Erva-mate': [0.60, 1.10, 1.05, 0.75],
    'Palmeira': [0.60, 1.10, 1.05, 0.75],
    'Borracha (seringueira)': [0.70, 1.10, 1.05, 0.80],
    'Oliveira': [0.60, 1.00, 0.95, 0.70],

    // Valor padrão para culturas não especificadas
    'DEFAULT': [0.50, 1.00, 0.95, 0.65]
  };

  // Tarifas de Águas de Sinop por m³ (água + esgoto)
  readonly TARIFAS_SINOP = {
    residencial: [
      { limite: 10, valor: 5.151 },
      { limite: 20, valor: 7.314 },
      { limite: 30, valor: 12.259 },
      { limite: Infinity, valor: 15.350 }
    ],
    comercial: [
      { limite: 10, valor: 10.508 },
      { limite: Infinity, valor: 17.462 }
    ],
    publica: [
      { limite: 10, valor: 15.350 },
      { limite: Infinity, valor: 25.188 }
    ],
    industrial: [
      { limite: 10, valor: 10.508 },
      { limite: Infinity, valor: 17.462 }
    ]
  };

  // Adicione esta propriedade para armazenar o tipo de consumo selecionado
  tipoConsumoSinop: keyof typeof this.TARIFAS_SINOP = 'residencial';

  // Fatores de ajuste por tipo de solo
  readonly SOLO_FACTORS = {
    arenoso: 1.10,
    argiloso: 0.95,
    siltoso: 1.00,
    humoso: 0.90,
    calcário: 1.00,
    salino: 1.15
  };

  atualizarCulturas() {
    this.culturasDisponiveis = this.CULTURAS[this.categoriaSelecionada] ?? [];
    this.culturaSelecionada = '';
  }

  formatarNumero(valor: number): string {
    const locale = this.translate.currentLang === 'pt' ? 'pt-BR' : (this.translate.currentLang === 'es' ? 'es-ES' : 'en-US');
    return valor.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatarArea() {
    if (this.area) {
      this.area = this.area.replace(/\D/g, '');
      this.area = this.area.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  parseNumber(value: string): number {
    return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
  }

  calcularNecessidadeHidrica() {
    if (!this.validarCampos()) return;

    let areaM2 = this.parseNumber(this.area);
    if (this.unidadeArea === 'hectares') {
      areaM2 *= this.HECTARE_PARA_M2;
    }

    const kcValues = this.KC_BASE[this.culturaSelecionada] || this.KC_BASE['DEFAULT'];
    const kcIndex = this.getKcIndex(this.estagioDesenvolvimento);
    const kcBase = kcValues[kcIndex];
    const soloFactor = this.SOLO_FACTORS[this.tipoSoloSelecionado] || 1.0;
    const kcAjustado = kcBase * soloFactor;

    const etc = this.eTo * kcAjustado;
    const laminaIrrigacao = etc / this.EFICIENCIA_IRRIGACAO;
    const volumeAguaLitros = laminaIrrigacao * areaM2;
    const volumeAguaM3 = volumeAguaLitros / 1000;

    // Calcula o custo com base nas tarifas de Sinop
    const custoAgua = this.calcularCustoSinop(volumeAguaM3);

    const volumeFormatado = `${this.formatarNumero(volumeAguaLitros)} L (${this.formatarNumero(volumeAguaM3)} m³)`;

    this.translate.get(['CALC.RESULT_WATER', 'CALC.RESULT_COST']).subscribe(res => {
      this.resultLitros = `${res['CALC.RESULT_WATER']}: ${volumeFormatado}`;
      this.resultCusto = `${res['CALC.RESULT_COST']}: ${custoAgua.toLocaleString(this.translate.currentLang === 'pt' ? 'pt-BR' : (this.translate.currentLang === 'es' ? 'es-ES' : 'en-US'), { style: 'currency', currency: 'BRL' })}`;
    });
  }

  private calcularCustoSinop(volumeM3: number): number {
    const faixas = this.TARIFAS_SINOP[this.tipoConsumoSinop];
    let custoTotal = 0;
    let volumeRestante = volumeM3;
    let faixaAnterior = 0;

    for (const faixa of faixas) {
      if (volumeRestante <= 0) break;

      const limiteFaixa = faixa.limite;
      const diferencaFaixa = limiteFaixa - faixaAnterior;
      const volumeNaFaixa = Math.min(volumeRestante, diferencaFaixa);

      custoTotal += volumeNaFaixa * faixa.valor;
      volumeRestante -= volumeNaFaixa;
      faixaAnterior = limiteFaixa;
    }

    return custoTotal;
  }

  private validarCampos(): boolean {
    if (!this.area || this.parseNumber(this.area) <= 0) {
      this.translate.get('CALC.ERROR_AREA').subscribe(msg => alert(msg));
      return false;
    }

    if (this.unidadeArea === 'selecione') {
      this.translate.get('CALC.ERROR_UNIT').subscribe(msg => alert(msg));
      return false;
    }

    if (!this.culturaSelecionada) {
      this.translate.get('CALC.ERROR_CROP').subscribe(msg => alert(msg));
      return false;
    }

    if (!this.tipoConsumoSinop) {
      this.translate.get('CALC.ERROR_CONS').subscribe(msg => alert(msg));
      return false;
    }

    return true;
  }

  private getKcIndex(estagio: string): number {
    const estagios = ['inicial', 'desenvolvimento', 'intermediário', 'final'];
    return estagios.indexOf(estagio) || 1; // Default para desenvolvimento se não encontrado
  }
}