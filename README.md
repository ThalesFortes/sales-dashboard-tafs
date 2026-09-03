<h1 align="center">Sales Dashboard</h1>

<p align="center">
  Plataforma de inteligência de vendas para equipes comerciais acompanharem KPIs,
  performance de vendedores e gestão de leads em um único painel.
</p>

<p align="center">
  <a href="https://sales-dashboard-tafs.vercel.app"><strong>🔗 Acessar demo ao vivo »</strong></a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white">
  <img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white">
  <img alt="MUI" src="https://img.shields.io/badge/MUI-7-007FFF?logo=mui&logoColor=white">
  <img alt="Tested with Jest & Cypress" src="https://img.shields.io/badge/tested_with-Jest_%2B_Cypress-17202C?logo=cypress&logoColor=white">
</p>

---

## 📋 Sobre o projeto

O **Sales Dashboard** é uma aplicação web que centraliza os dados comerciais de uma
empresa e transforma números dispersos em decisões acionáveis. A ideia é dar ao time
de vendas e à liderança uma visão única e em tempo real da operação: quanto foi vendido,
quem são os destaques do mês, como estão os leads e o que está acontecendo no setor.

O produto foi construído do zero seguindo padrões de aplicação em produção —
autenticação segura, rotas protegidas, camada de dados desacoplada, tema
personalizável e cobertura de testes automatizados (unitários, snapshot e end-to-end).

> 💡 **Nota:** projeto autoral desenvolvido como estudo de caso de uma plataforma
> SaaS real, com foco em qualidade de engenharia e experiência de produto de ponta a ponta.

> 🔌 **API mockada:** o backend original era uma API de prática usada durante um
> bootcamp e foi desativado. Para o projeto continuar 100% funcional como peça de
> portfólio, todas as chamadas HTTP são interceptadas no próprio client
> (`axios-mock-adapter`, ver `src/mocks/`), com dados persistidos em `localStorage`.
> Não é necessário nenhum backend rodando — basta `npm install && npm run dev`.

<!-- Dica: adicione aqui um GIF ou screenshot do dashboard para causar impacto imediato.
     ![Preview](./public/preview.png) -->

---

## ✨ Funcionalidades

- **Autenticação com JWT**: login e cadastro com token armazenado em cookie e
  validação de expiração no cliente.
- **Rotas protegidas**: áreas internas (Home, Leads, Perfil) só são acessíveis com
  sessão válida; usuários não autenticados são redirecionados automaticamente.
- **Dashboard de vendas**: KPIs de destaque, gráfico de vendas por mês e por ano,
  ranking de vendedores (top performers) e feed de notícias do setor.
- **Gestão de leads (CRUD)**: cadastro, listagem e exclusão de leads com validação
  de formulário em tempo real.
- **Perfil do usuário**: visualização e atualização dos dados da conta.
- **Tema claro/escuro**: alternância de temas com Context API e styled-components.
- **Validação inteligente de formulários** — regras de e-mail e senha forte
  (comprimento, maiúscula, número e caractere especial) reaproveitáveis via hook.

---

## 🛠️ Tecnologias & decisões técnicas

| Área | Escolha | Por quê |
|------|---------|---------|
| **Base** | React 19 + TypeScript + Vite 7 | DX rápida, HMR instantâneo e tipagem forte em toda a aplicação |
| **UI** | MUI 7 + styled-components + Emotion | Componentes acessíveis combinados com estilização customizada e temável |
| **Estado global** | Redux Toolkit + React Redux | Gerenciamento previsível de estado compartilhado (ex.: fluxo de cadastro) |
| **Roteamento** | React Router DOM 7 | Rotas aninhadas e proteção de rotas via `Outlet` |
| **Requisições** | Axios encapsulado em hooks customizados | `useGet`, `usePost`, `usePut`, `useDelete` genéricos e tipados, com auth automática |
| **Gráficos** | Chart.js + react-chartjs-2 | Visualizações de vendas responsivas e configuráveis |
| **Testes** | Jest + Testing Library + Cypress | Cobertura unitária, snapshot e E2E dos fluxos críticos |
| **Qualidade** | ESLint + Prettier | Padronização e consistência de código |
| **Deploy** | Vercel | CI/CD contínuo com rewrites de SPA |

### Destaques de arquitetura

- **Camada de dados desacoplada:** toda a comunicação com a API passa por hooks
  genéricos e tipados (`useAxios`), que injetam o token de autenticação e padronizam
  os estados de `loading` e `error`. As páginas não conhecem detalhes de HTTP.
- **Tipagem centralizada:** todos os contratos de dados vivem em `src/types`,
  garantindo consistência entre componentes, hooks e chamadas de API.
- **Componentização reaproveitável:** tabela, gráfico, cards, inputs e botões são
  componentes genéricos parametrizados por props tipadas.
- **Path aliases (`@/`):** imports limpos e navegação simples pela base de código.

---

## 🧪 Testes

A aplicação conta com testes automatizados em três níveis:

- **Unitários e de snapshot** (Jest + Testing Library): componentes e funções
  utilitárias (conversão de moeda, formatação de texto, expiração de JWT, `pxToRem`).
- **End-to-end** (Cypress): cobrindo os fluxos de **login**, **homepage**,
  **leads**, **perfil** e **cadastro**.

```bash
npm test              # testes unitários com relatório de cobertura
npm run cypress:open  # abre o Cypress em modo interativo
npm run cypress:run   # executa a suíte E2E em modo headless
```

---

## 📁 Estrutura do projeto

```
src/
├── components/    # Componentes reaproveitáveis (Table, Chart, Cards, Inputs...)
├── contexts/      # AppThemeContext (tema claro/escuro)
├── hooks/         # useAxios (CRUD) e useFormValidation
├── pages/         # Login, Registration, Home, Leads, Profile
├── redux/         # Store e slices (Redux Toolkit)
├── services/      # Serviços de apoio (ex.: logout)
├── styles/        # Temas e estilos globais
├── types/         # Definições de tipos TypeScript
└── utils/         # Funções utilitárias
cypress/           # Testes end-to-end
```

---

## 🚀 Rodando localmente

**Pré-requisitos:** Node.js 18+ e npm.

```bash
# 1. Clone o repositório
git clone https://github.com/ThalesFortes/sales-dashboard-tafs.git
cd sales-dashboard-tafs

# 2. Instale as dependências
npm install

# 3. Suba o ambiente de desenvolvimento (já usa a API mockada por padrão)
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`. Use o login de demonstração
`tester_cypress@dnc.com.br` / `@DNCReact178#` (ou cadastre uma conta nova).

Se um dia quiser plugar um backend real, edite o `.env`:

```bash
VITE_API_BASE_URL=<url_da_sua_api>
VITE_USE_MOCK_API=false
```

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Ambiente de desenvolvimento com HMR |
| `npm run build` | Type-check + build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Análise estática com ESLint |
| `npm test` | Testes unitários com cobertura |
| `npm run cypress:open` / `cypress:run` | Testes E2E |

---

## 🌐 Deploy

Hospedado na **Vercel** com integração contínua a partir da branch `main`.
O arquivo `vercel.json` configura os rewrites necessários para o roteamento
client-side da SPA.

**Demo:** [sales-dashboard-tafs.vercel.app](https://sales-dashboard-tafs.vercel.app)

---

## 👤 Autor

**Thales Fortes**

[![GitHub](https://img.shields.io/badge/GitHub-ThalesFortes-181717?logo=github)](https://github.com/ThalesFortes)

> Aberto a oportunidades como desenvolvedor Front-end / React. Sinta-se à vontade para
> explorar o código, abrir uma issue ou entrar em contato.
