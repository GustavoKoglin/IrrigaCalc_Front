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
  unidadeArea: string = 'selecione'; // Padrão: Metros Quadrados
  unidadeVolume: string = 'litros'; // Padrão: Litros
  area: string = ''; // Valor da área a ser digitado

  formatarNumero(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatarArea() {
    if (this.area) {
      this.area = this.area.replace(/\D/g, ''); // Remove tudo que não for número
      this.area = this.area.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos como separador de milhar
    }
  }

  parseNumber(value: string): number {
    return parseFloat(value) || 0; // Retorna 0 se não for um número válido
  }

  calcularNecessidadeHidrica(area: number, tipoSolo: string, cultura: string, estagioDesenvolvimento: string, eTo: number) {
    let areaConvertida = parseFloat(this.area.replace(/\./g, '').replace(',', '.'));

    if (this.unidadeArea === 'hectares') {
      area = area * 10000; // Converter hectares para metros quadrados
    }

    if (isNaN(area) || area <= 0) {
      alert("Por favor, insira um valor válido para a área.");
      return;
    }

    if (this.unidadeArea === 'hectares') {
      areaConvertida *= 10000; // Converter hectares para metros quadrados
    }

    // **Valores de Kc baseados na cultura e estágio de desenvolvimento**
    const kcValores: { [key: string]: { [key: string]: { [key: string]: number } } } = {
      arenoso: {
        milho: { inicial: 0.3, desenvolvimento: 1.2, intermediário: 1.15, final: 0.6 },
        soja: { inicial: 0.4, desenvolvimento: 1.15, intermediário: 1.1, final: 0.5 },
        arroz: { inicial: 1.1, desenvolvimento: 1.5, intermediário: 1.3, final: 0.8 },
        trigo: { inicial: 0.7, desenvolvimento: 1.1, intermediário: 1.0, final: 0.4 },
        café: { inicial: 0.6, desenvolvimento: 1.0, intermediário: 1.0, final: 0.8 },
        cevada: { inicial: 0.7, desenvolvimento: 1.2, intermediário: 1.1, final: 0.5 },
        algodão: { inicial: 0.5, desenvolvimento: 1.3, intermediário: 1.15, final: 0.55 },
        cana: { inicial: 0.4, desenvolvimento: 1.2, intermediário: 1.0, final: 0.7 },
        sorgo: { inicial: 0.6, desenvolvimento: 1.1, intermediário: 1.0, final: 0.5 },
        girassol: { inicial: 0.5, desenvolvimento: 1.1, intermediário: 1.0, final: 0.5 },
        hortaliças: { inicial: 0.8, desenvolvimento: 1.4, intermediário: 1.2, final: 0.6 }
      },
      argiloso: {
        milho: { inicial: 0.35, desenvolvimento: 1.3, intermediário: 1.2, final: 0.65 },
        soja: { inicial: 0.45, desenvolvimento: 1.2, intermediário: 1.15, final: 0.55 },
        arroz: { inicial: 1.2, desenvolvimento: 1.6, intermediário: 1.4, final: 0.85 },
        trigo: { inicial: 0.75, desenvolvimento: 1.2, intermediário: 1.05, final: 0.45 },
        café: { inicial: 0.7, desenvolvimento: 1.1, intermediário: 1.05, final: 0.85 },
        cevada: { inicial: 0.75, desenvolvimento: 1.3, intermediário: 1.15, final: 0.55 },
        algodão: { inicial: 0.6, desenvolvimento: 1.4, intermediário: 1.25, final: 0.6 },
        cana: { inicial: 0.5, desenvolvimento: 1.3, intermediário: 1.1, final: 0.75 },
        sorgo: { inicial: 0.7, desenvolvimento: 1.2, intermediário: 1.05, final: 0.55 },
        girassol: { inicial: 0.6, desenvolvimento: 1.2, intermediário: 1.05, final: 0.55 },
        hortaliças: { inicial: 0.85, desenvolvimento: 1.5, intermediário: 1.3, final: 0.7 }
      },
      siltoso: {
        milho: { inicial: 0.32, desenvolvimento: 1.22, intermediário: 1.18, final: 0.63 },
        soja: { inicial: 0.42, desenvolvimento: 1.18, intermediário: 1.12, final: 0.52 },
        arroz: { inicial: 1.15, desenvolvimento: 1.55, intermediário: 1.35, final: 0.82 },
        trigo: { inicial: 0.72, desenvolvimento: 1.15, intermediário: 1.02, final: 0.43 },
        café: { inicial: 0.65, desenvolvimento: 1.05, intermediário: 1.0, final: 0.8 },
        cevada: { inicial: 0.72, desenvolvimento: 1.25, intermediário: 1.1, final: 0.53 },
        algodão: { inicial: 0.55, desenvolvimento: 1.35, intermediário: 1.2, final: 0.58 },
        cana: { inicial: 0.45, desenvolvimento: 1.25, intermediário: 1.05, final: 0.72 },
        sorgo: { inicial: 0.65, desenvolvimento: 1.15, intermediário: 1.0, final: 0.52 },
        girassol: { inicial: 0.55, desenvolvimento: 1.15, intermediário: 1.0, final: 0.52 },
        hortaliças: { inicial: 0.8, desenvolvimento: 1.45, intermediário: 1.25, final: 0.65 }
      },
      humoso: {
        milho: { inicial: 0.38, desenvolvimento: 1.35, intermediário: 1.25, final: 0.68 },
        soja: { inicial: 0.48, desenvolvimento: 1.3, intermediário: 1.25, final: 0.6 },
        arroz: { inicial: 1.3, desenvolvimento: 1.75, intermediário: 1.5, final: 0.95 },
        trigo: { inicial: 0.8, desenvolvimento: 1.3, intermediário: 1.15, final: 0.5 },
        café: { inicial: 0.7, desenvolvimento: 1.2, intermediário: 1.15, final: 0.9 },
        cevada: { inicial: 0.8, desenvolvimento: 1.35, intermediário: 1.2, final: 0.6 },
        algodão: { inicial: 0.6, desenvolvimento: 1.45, intermediário: 1.3, final: 0.65 },
        cana: { inicial: 0.5, desenvolvimento: 1.4, intermediário: 1.2, final: 0.8 },
        sorgo: { inicial: 0.7, desenvolvimento: 1.25, intermediário: 1.1, final: 0.6 },
        girassol: { inicial: 0.6, desenvolvimento: 1.3, intermediário: 1.15, final: 0.6 },
        hortaliças: { inicial: 0.9, desenvolvimento: 1.6, intermediário: 1.4, final: 0.75 }
      },
      calcário: {
        milho: { inicial: 0.36, desenvolvimento: 1.3, intermediário: 1.22, final: 0.66 },
        soja: { inicial: 0.46, desenvolvimento: 1.25, intermediário: 1.2, final: 0.57 },
        arroz: { inicial: 1.2, desenvolvimento: 1.65, intermediário: 1.4, final: 0.88 },
        trigo: { inicial: 0.77, desenvolvimento: 1.22, intermediário: 1.08, final: 0.46 },
        café: { inicial: 0.68, desenvolvimento: 1.15, intermediário: 1.1, final: 0.86 },
        cevada: { inicial: 0.76, desenvolvimento: 1.3, intermediário: 1.18, final: 0.57 },
        algodão: { inicial: 0.58, desenvolvimento: 1.4, intermediário: 1.28, final: 0.63 },
        cana: { inicial: 0.48, desenvolvimento: 1.3, intermediário: 1.15, final: 0.77 },
        sorgo: { inicial: 0.69, desenvolvimento: 1.2, intermediário: 1.08, final: 0.58 },
        girassol: { inicial: 0.58, desenvolvimento: 1.2, intermediário: 1.08, final: 0.58 },
        hortaliças: { inicial: 0.88, desenvolvimento: 1.55, intermediário: 1.35, final: 0.72 }
      },
      salino: {
        milho: { inicial: 0.28, desenvolvimento: 1.12, intermediário: 1.07, final: 0.52 },
        soja: { inicial: 0.38, desenvolvimento: 1.1, intermediário: 1.05, final: 0.48 },
        arroz: { inicial: 1.05, desenvolvimento: 1.4, intermediário: 1.25, final: 0.73 },
        trigo: { inicial: 0.67, desenvolvimento: 1.05, intermediário: 0.92, final: 0.37 },
        café: { inicial: 0.6, desenvolvimento: 1.0, intermediário: 0.95, final: 0.78 },
        cevada: { inicial: 0.68, desenvolvimento: 1.1, intermediário: 1.0, final: 0.5 },
        algodão: { inicial: 0.5, desenvolvimento: 1.2, intermediário: 1.1, final: 0.55 },
        cana: { inicial: 0.4, desenvolvimento: 1.1, intermediário: 1.0, final: 0.7 },
        sorgo: { inicial: 0.6, desenvolvimento: 1.05, intermediário: 1.0, final: 0.5 },
        girassol: { inicial: 0.5, desenvolvimento: 1.05, intermediário: 1.0, final: 0.5 },
        hortaliças: { inicial: 0.75, desenvolvimento: 1.3, intermediário: 1.15, final: 0.65 }
      }
    };

    if (!kcValores[tipoSolo] || !kcValores[tipoSolo][cultura] || !kcValores[tipoSolo][cultura][estagioDesenvolvimento]) {
      alert('Erro: Cultura, tipo de solo ou estágio de desenvolvimento inválidos.');
      return;
    }

    const kc = kcValores[tipoSolo][cultura][estagioDesenvolvimento];
    const etc = eTo * kc;
    const eficienciaIrrigacao = 0.85;
    const laminaIrrigacao = etc / eficienciaIrrigacao;
    const volumeAguaLitros = laminaIrrigacao * areaConvertida;
    const volumeAguaM3 = volumeAguaLitros / 1000;
    const custoAgua = volumeAguaM3 * 2.50;


    // **Formatação dos resultados**
    const volumeFormatado = this.unidadeVolume === 'litros'
      ? `${this.formatarNumero(volumeAguaLitros)} L (${this.formatarNumero(volumeAguaM3)} m³)`
      : `${this.formatarNumero(volumeAguaM3)} m³ (${this.formatarNumero(volumeAguaLitros)} L)`;

    this.resultLitros = `💧 Volume de Água: ${volumeFormatado}`;
    this.resultCusto = `💰 Custo Estimado: ${custoAgua.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  }
}
