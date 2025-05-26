# Calculadora de Consumo Hídrico para Irrigação

Este projeto é uma aplicação web desenvolvida com Angular e Bootstrap que tem como objetivo auxiliar pequenos produtores a estimar o consumo de água necessário para irrigação, utilizando dados e recomendações técnicas da Embrapa. Através de um formulário simples, os usuários podem inserir parâmetros (como área cultivada, tipo de cultura e características do solo) para que o sistema calcule a quantidade ideal de água a ser aplicada.

---

## Descrição do Projeto

A "Calculadora de Consumo Hídrico para Irrigação" é um software de extensão voltado à sustentabilidade no meio rural. Ele permite que produtores planejem de forma mais eficiente a irrigação de suas lavouras, contribuindo para a economia de água e para o manejo sustentável dos recursos hídricos. O projeto também serve como uma ferramenta educativa, integrando informações técnicas baseadas em publicações e cartilhas da Embrapa.

---

## Tecnologias Utilizadas

- **Angular**: Framework para desenvolvimento de aplicações web Single Page Application (SPA).
- **Bootstrap**: Biblioteca para criação de interfaces responsivas e modernas.
- **TypeScript, HTML, CSS e JavaScript**: Linguagens e tecnologias base utilizadas no desenvolvimento.

---

## Estrutura do Projeto

A estrutura do projeto segue o padrão Angular, organizada em componentes e serviços conforme mostrado abaixo:

```
IrrigaCalc_Front
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   │   ├── header.component.ts
│   │   │   ├── header.component.html
│   │   │   └── header.component.css
│   │   ├── footer/
│   │   │   ├── footer.component.ts
│   │   │   ├── footer.component.html
│   │   │   └── footer.component.css
│   │   ├── home/
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.css
│   │   ├── calculadora/
│   │   │   ├── calculadora.component.ts
│   │   │   ├── calculadora.component.html
│   │   │   └── calculadora.component.css
│   │   └── about/
│   │       ├── about.component.ts
│   │       ├── about.component.html
│   │       └── about.component.css
│   ├── services/
│   │   └── calculation.service.ts
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.module.ts
├── assets/
└── styles.css
```

---


### Componentes

- **HeaderComponent**: Barra de navegação com links para as páginas Home, Calculadora e About.
- **FooterComponent**: Rodapé com informações de contato e referências.
- **HomeComponent**: Página inicial que apresenta o projeto e suas funcionalidades.
- **CalculadoraComponent**: Componente principal onde o usuário insere os dados para o cálculo do consumo hídrico.
- **AboutComponent**: Página com informações sobre o projeto, a conexão com a Embrapa e referências utilizadas.

### Serviços

- **CalculationService**: Serviço responsável por implementar a lógica de cálculo do consumo hídrico com base nos dados fornecidos pelo usuário.

---

## Como Executar o Projeto

1. **Pré-requisitos**:
   - Node.js e npm instalados.
   - Angular CLI instalado globalmente:
     ```bash
     npm install -g @angular/cli
     ```
2. **Instalação**:
   - Clone o repositório para sua máquina.
   - Navegue até o diretório do projeto.
   - Execute:
     ```bash
     npm install
     ```
3. **Execução**:
   - Inicie o servidor de desenvolvimento:
     ```bash
     ng serve
     ```
   - Acesse a aplicação em: [http://localhost:4200](http://localhost:4200)

---

## Considerações Finais

Este projeto foi desenvolvido com o intuito de auxiliar pequenos produtores a planejar a irrigação de maneira sustentável, reduzindo o desperdício de água e promovendo o uso de boas práticas agrícolas conforme orientações da Embrapa. A aplicação possui um escopo enxuto, focado no cálculo do consumo hídrico e na exibição de resultados de forma simples e intuitiva.

Fique à vontade para contribuir ou sugerir melhorias!

---

## Referências

- Cartilhas e publicações da Embrapa sobre irrigação e manejo sustentável.
- Documentação do Angular: [https://angular.io](https://angular.io)
- Bootstrap: [https://getbootstrap.com](https://getbootstrap.com)
