import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-irrigation-calculator',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './irrigation-calculator.component.html',
  styleUrls: ['./irrigation-calculator.component.scss']
})
export class IrrigationCalculatorComponent {
  
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
    'Banana': [0.75, 1.15, 1.20, 0.90],
    // ... (todos os outros valores Kc)
    'DEFAULT': [0.50, 1.00, 0.95, 0.65]
  };

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
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
    const custoAgua = volumeAguaM3 * this.CUSTO_M3_AGUA;

    const volumeFormatado = `${this.formatarNumero(volumeAguaLitros)} L (${this.formatarNumero(volumeAguaM3)} m³)`;
    
    this.resultLitros = `💧 Volume de Água: ${volumeFormatado}`;
    this.resultCusto = `💰 Custo Estimado: ${custoAgua.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  }

  private validarCampos(): boolean {
    if (!this.area || this.parseNumber(this.area) <= 0) {
      alert("Por favor, insira um valor válido para a área.");
      return false;
    }

    if (this.unidadeArea === 'selecione') {
      alert("Por favor, selecione uma unidade de área.");
      return false;
    }

    if (!this.culturaSelecionada) {
      alert("Por favor, selecione uma cultura.");
      return false;
    }

    return true;
  }

  private getKcIndex(estagio: string): number {
    const estagios = ['inicial', 'desenvolvimento', 'intermediário', 'final'];
    return estagios.indexOf(estagio) || 1; // Default para desenvolvimento se não encontrado
  }
}