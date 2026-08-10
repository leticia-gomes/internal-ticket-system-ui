# Internal Ticket System UI

Interface web para gerenciamento de chamados internos, desenvolvida com **Vue 3 + TypeScript** como parte de um **desafio técnico Full Stack**.

A aplicação foi construída com foco em **organização de código, arquitetura modular, separação de responsabilidades, integração com API REST, gerenciamento de estado, autenticação e experiência de uso**.

O front-end faz parte de uma solução Full Stack composta por dois repositórios:

| Projeto                        | Responsabilidade                    |
| ------------------------------ | ----------------------------------- |
| **Internal Ticket System UI**  | Interface web em Vue 3 + TypeScript |
| **Internal Ticket System API** | API REST em Node.js + TypeScript    |

---

# Sobre o projeto

O sistema simula uma aplicação interna de gerenciamento de chamados.

Usuários autenticados podem:

* Visualizar chamados;
* Criar chamados;
* Editar chamados;
* Excluir chamados;
* Alterar status;
* Alterar prioridade;
* Atribuir responsáveis;
* Consultar detalhes;
* Adicionar comentários;
* Acompanhar informações do chamado.

A interface foi desenvolvida priorizando **clareza, funcionalidade e organização**, seguindo o objetivo do desafio técnico de demonstrar domínio das tecnologias e boas práticas de desenvolvimento.

---

# Tecnologias

## Front-end

| Tecnologia           | Utilização                |
| -------------------- | ------------------------- |
| **Vue 3**            | Framework da interface    |
| **TypeScript**       | Tipagem estática          |
| **Vite**             | Build e desenvolvimento   |
| **Pinia**            | Gerenciamento de estado   |
| **Vue Router**       | Navegação e rotas         |
| **Axios**            | Comunicação HTTP          |
| **Socket.IO Client** | Comunicação em tempo real |
| **ESLint**           | Qualidade de código       |
| **Prettier**         | Formatação                |

As versões e scripts utilizados no projeto estão definidos no `package.json`.

---

# Arquitetura

O projeto utiliza uma organização baseada em **módulos/funcionalidades**, evitando concentrar toda a aplicação em componentes ou serviços genéricos.

Uma visão simplificada da estrutura:

```text
src/
├── app/
│   ├── guards/
│   └── router/
│
├── modules/
│   ├── auth/
│   ├── dashboard/
│   ├── tickets/
│   ├── users/
│   └── errors/
│
├── assets/
│
└── main.ts
```

A organização por domínio permite que cada funcionalidade mantenha seus próprios:

* Componentes;
* Páginas;
* Serviços;
* Stores;
* Tipos;
* APIs;
* Regras específicas da interface.

---

# Fluxo da aplicação

A comunicação entre a interface e a API segue uma separação clara:

```text
┌──────────────────────┐
│      Vue Page        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     Pinia Store      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Domain Service     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      API Module      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│        Axios         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     REST API         │
└──────────────────────┘
```

Dessa forma, os componentes de interface não precisam conhecer diretamente os detalhes da comunicação HTTP.

---

# Autenticação

A aplicação possui fluxo de autenticação integrado à API.

O processo funciona da seguinte maneira:

```text
Usuário
   │
   ▼
Tela de Login
   │
   ▼
API de autenticação
   │
   ▼
JWT
   │
   ▼
Armazenamento do token
   │
   ▼
Rotas protegidas
```

A aplicação utiliza:

* Login por e-mail e senha;
* Token JWT;
* Armazenamento local do token;
* Pinia para estado de autenticação;
* Proteção das rotas privadas;
* Logout.

O token é incluído automaticamente nas requisições feitas através da camada HTTP.

---

# Rotas

O Vue Router é responsável pela navegação da aplicação.

A estrutura de navegação separa páginas públicas e autenticadas.

Exemplo conceitual:

```text
/
│
├── /login
│
└── /tickets
    │
    ├── /tickets
    ├── /tickets/new
    ├── /tickets/:id
    └── /tickets/:id/edit
```

As páginas relacionadas ao gerenciamento de chamados são protegidas e dependem de autenticação.

---

# Gerenciamento de chamados

O módulo de tickets concentra as principais funcionalidades da aplicação.

## Listagem

A tela de listagem permite:

* Visualizar chamados;
* Filtrar por status;
* Filtrar por prioridade;
* Consultar informações resumidas;
* Acessar detalhes;
* Editar;
* Excluir.

A interface utiliza componentes específicos para apresentação dos dados, evitando concentrar toda a lógica na página.

---

# Criação de chamado

A tela de criação permite informar:

* Título;
* Descrição;
* Prioridade;
* Responsável.

Os dados são enviados para a API através da camada de serviços.

Fluxo:

```text
TicketCreatePage
       │
       ▼
   TicketForm
       │
       ▼
 TicketService
       │
       ▼
 Ticket API
```

As mensagens de validação retornadas pela API são tratadas pela interface para orientar o usuário sobre os campos inválidos.

---

# Edição de chamado

A edição utiliza o mesmo conceito de formulário reutilizável empregado na criação.

A página de edição carrega os dados existentes do chamado e permite alterar informações como:

* Título;
* Descrição;
* Status;
* Prioridade;
* Responsável.

A reutilização do formulário reduz duplicação e mantém o comportamento das telas consistente.

---

# Detalhes do chamado

A tela de detalhes apresenta as informações completas do ticket.

Entre os dados exibidos estão:

* Título;
* Descrição;
* Status;
* Prioridade;
* Criador;
* Responsável;
* Datas;
* Comentários.

A página também concentra ações relacionadas ao chamado.

---

# Comentários

Os comentários fazem parte da experiência de acompanhamento do ticket.

O módulo possui componentes específicos para:

```text
TicketDetailsPage
       │
       ├── TicketInfo
       │
       ├── AssignUserSelect
       │
       └── TicketComments
               │
               └── CommentForm
```

Os comentários são obtidos através dos dados do ticket e apresentados na tela de detalhes.

Usuários autenticados podem adicionar comentários diretamente pela interface.

---

# Responsável pelo chamado

A interface possui um componente específico para seleção do usuário responsável:

```text
AssignUserSelect
```

Esse componente mantém a responsabilidade de apresentar e selecionar usuários disponíveis, enquanto a atualização do chamado permanece na camada de serviço.

---

# Filtros

A listagem de chamados possui filtros para facilitar a localização dos tickets.

Entre os filtros utilizados estão:

* Status;
* Prioridade.

Os filtros são mantidos no estado da aplicação e utilizados para consultar os dados da API.

Fluxo:

```text
Filtros
   │
   ▼
Ticket Store
   │
   ▼
Ticket Service
   │
   ▼
GET /tickets
   │
   ▼
API
```

---

# Gerenciamento de estado

O gerenciamento de estado global é realizado através do **Pinia**.

O estado de tickets mantém informações como:

```text
tickets
selectedTicket
filters
loading
```

Isso permite compartilhar o estado entre páginas e componentes sem criar dependências diretas entre eles.

O estado de autenticação também é centralizado através do Pinia.

---

# Comunicação com a API

A comunicação HTTP é centralizada através do **Axios**.

A aplicação possui uma instância configurada para:

* URL base da API;
* Headers;
* Token de autenticação;
* Tratamento de respostas;
* Tratamento de erros.

A organização segue o conceito:

```text
Component
    ↓
Store / Service
    ↓
API module
    ↓
Axios
    ↓
Back-end
```

Isso evita chamadas HTTP diretamente dentro dos componentes de apresentação.

---

# Comunicação em tempo real

O projeto utiliza `socket.io-client` para comunicação em tempo real com a API.

A estrutura foi criada para permitir que alterações realizadas no back-end sejam refletidas nos clientes conectados.

Eventos utilizados no domínio de tickets incluem eventos relacionados a:

```text
ticket:created
ticket:updated
ticket:deleted
ticket:assigned
comment:created
```

A integração com o Socket.IO é mantida em uma camada própria:

```text
Ticket Socket
      │
      ▼
Socket.IO Client
      │
      ▼
Node.js API
```

O gerenciamento do estado recebido pelos eventos é integrado ao Pinia.

> **Status atual:** a infraestrutura de Socket.IO e os listeners principais estão implementados. O fluxo completo de sincronização em tempo real de todas as operações ainda pode ser refinado.

---

# Componentização

A interface utiliza componentes reutilizáveis para evitar duplicação de código.

Exemplos do domínio de tickets:

```text
TicketTable
TicketForm
TicketFilters
UserSelect
UserTable
```

Cada componente possui uma responsabilidade específica.

Por exemplo:

```text
TicketTable
    └── Apresentação da listagem

TicketForm
    └── Criação/edição

TicketFilters
    └── Exibição dos filtros

TicketComments
    └── Listagem de comentários

UserTable
    └── Apresentação da listagem

UserSelect
    └── Seleção de usuário responsável
```

Essa abordagem facilita manutenção, reutilização e evolução da interface.

---

# Tratamento de erros

A API possui respostas estruturadas para erros de validação.

Exemplo:

```json
{
  "message": "Falha na validação",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "title",
      "message": "Too small: expected string to have >=3 characters"
    },
    {
      "field": "description",
      "message": "Too small: expected string to have >=5 characters"
    }
  ]
}
```

O front-end interpreta esse formato para apresentar mensagens associadas aos campos do formulário.

Isso mantém o contrato entre front-end e back-end explícito e previsível.

---

# Estrutura de responsabilidades

A aplicação busca manter cada camada responsável por uma parte específica do fluxo:

| Camada             | Responsabilidade                  |
| ------------------ | --------------------------------- |
| **Pages**          | Composição das telas              |
| **Components**     | Interface reutilizável            |
| **Pinia Stores**   | Estado da aplicação               |
| **Services**       | Regras de interação com o domínio |
| **API modules**    | Comunicação HTTP                  |
| **Socket modules** | Comunicação em tempo real         |
| **Types**          | Contratos TypeScript              |
| **Router**         | Navegação                         |
| **Guards**         | Proteção de rotas                 |

---

# Pré-requisitos

Para executar o projeto, é necessário ter:

* Node.js **22.18+** ou versão compatível;
* npm;
* A API do projeto executando;
* MySQL configurado para o back-end.

O `package.json` declara suporte a Node.js `^22.18.0 || >=24.12.0`.

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/leticia-gomes/internal-ticket-system-ui.git
```

Entre na pasta:

```bash
cd internal-ticket-system-ui
```

Instale as dependências:

```bash
npm install
```

---

# Configuração

Crie o arquivo de ambiente:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure a URL da API:

```env
VITE_API_URL=http://localhost:3333
```

> O nome exato das variáveis deve permanecer alinhado com a configuração utilizada pelo projeto.

---

# Executando o projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Por padrão, o Vite disponibiliza a aplicação em:

```text
http://localhost:5173
```

---

# Build

Para gerar a versão de produção:

```bash
npm run build
```

Esse comando executa a verificação de tipos e o build da aplicação.

Também é possível executar apenas o build:

```bash
npm run build-only
```

Para visualizar a versão de produção localmente:

```bash
npm run preview
```

Os scripts fazem parte da configuração oficial do projeto.

---

# Qualidade de código

O projeto possui ferramentas para manter consistência e qualidade do código.

## TypeScript

Verificação de tipos:

```bash
npm run type-check
```

## ESLint

O projeto possui ESLint integrado:

```bash
npm run lint:eslint
```

## Oxlint

Também é utilizado Oxlint:

```bash
npm run lint:oxlint
```

## Prettier

Para formatar o código:

```bash
npm run format
```

## Validação

O script principal de lint executa as verificações configuradas:

```bash
npm run lint
```

---

# Testes

A entrega atual priorizou a implementação funcional do front-end e sua integração com a API.

No estado atual:

| Área                            |        Status        |
| ------------------------------- | :------------------: |
| Integração com API              |           ✅          |
| Autenticação                    |           ✅          |
| CRUD de tickets                 |           ✅          |
| Filtros                         |           ✅          |
| Comentários                     |           ✅          |
| Socket.IO Client                |           ✅          |
| Gerenciamento de estado         |           ✅          |
| Testes automatizados de UI      | ⚠️ Não implementados |
| Sincronização realtime completa |    ⚠️ Em evolução    |

A ausência de testes automatizados de interface é uma limitação conhecida desta entrega e pode ser tratada como evolução futura.

---

# API

O front-end depende da API correspondente:

## Internal Ticket System API

[Repositório do Back-end](https://github.com/leticia-gomes/internal-ticket-system-api)

A API é responsável por:

* Autenticação;
* Usuários;
* Tickets;
* Comentários;
* Validação;
* Persistência;
* Socket.IO.

---

# Integração Full Stack

A solução completa funciona da seguinte maneira:

```text
                 ┌───────────────────────┐
                 │       Usuário         │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │     Vue 3 + TS        │
                 │         UI            │
                 └───────────┬───────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                  Axios          Socket.IO
                    │                 │
                    ▼                 ▼
             ┌─────────────────────────────┐
             │        Node.js API          │
             │          Express            │
             └──────────────┬──────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │     MySQL     │
                    └───────────────┘
```

O front-end é responsável pela apresentação e interação do usuário, enquanto a API concentra autenticação, regras de negócio e persistência.

---

# Status do desafio

| Requisito                       |        Status        |
| ------------------------------- | :------------------: |
| Vue 3                           |           ✅          |
| TypeScript                      |           ✅          |
| Vite                            |           ✅          |
| Pinia                           |           ✅          |
| Vue Router                      |           ✅          |
| Axios                           |           ✅          |
| Autenticação                    |           ✅          |
| Rotas protegidas                |           ✅          |
| Listagem de tickets             |           ✅          |
| Criação de tickets              |           ✅          |
| Edição de tickets               |           ✅          |
| Exclusão de tickets             |           ✅          |
| Filtros                         |           ✅          |
| Detalhes do ticket              |           ✅          |
| Atribuição de responsável       |           ✅          |
| Comentários                     |           ✅          |
| Integração Socket.IO            |           ✅          |
| Sincronização realtime completa |    ⚠️ Em evolução    |
| Testes automatizados de UI      | ⚠️ Não implementados |
| Integração com API              |           ✅          |
| Docker Full Stack               |   ⚠️ Não concluído   |

---

# Decisões técnicas

## Vue 3

Vue 3 foi utilizado para construir a interface de forma componentizada, permitindo separar páginas, componentes reutilizáveis e lógica de domínio.

---

## TypeScript

TypeScript é utilizado para criar contratos explícitos entre:

* Componentes;
* Stores;
* Serviços;
* APIs;
* Dados recebidos do back-end.

Isso reduz erros e facilita manutenção.

---

## Pinia

Pinia foi escolhido para centralizar estados compartilhados, principalmente:

* Autenticação;
* Tickets;
* Ticket selecionado;
* Filtros;
* Estado de carregamento.

---

## Vue Router

O Vue Router organiza a navegação da aplicação e permite proteger áreas que dependem de autenticação.

---

## Axios

A comunicação com a API foi centralizada em uma camada HTTP, evitando chamadas espalhadas pelos componentes.

Essa decisão também facilita:

* Configuração da URL da API;
* Inclusão do token;
* Tratamento de erros;
* Manutenção do contrato HTTP.

---

## Socket.IO

O Socket.IO Client foi adotado para permitir comunicação em tempo real com a API.

A implementação foi isolada em uma camada própria para reduzir o acoplamento entre componentes Vue e a infraestrutura de WebSocket.

---

# Limitações conhecidas

Como esta aplicação foi desenvolvida dentro do prazo de um **desafio técnico**, alguns pontos permanecem como oportunidades de evolução.

### Testes automatizados

A interface ainda não possui uma suíte completa de testes automatizados.

Como evolução, poderiam ser adicionados testes utilizando ferramentas como:

* Vitest;
* Vue Test Utils;
* Testes de componentes;
* Testes de fluxo.

### Realtime

A estrutura de Socket.IO está implementada, porém a sincronização completa de todas as alterações entre múltiplos clientes ainda pode ser aprimorada.

### Docker

A configuração Docker da solução Full Stack ainda não está finalizada.

A execução atual recomendada é através do ambiente local utilizando Node.js, Vite e a API conectada ao MySQL.

---

# Próximos passos

Entre as evoluções planejadas:

* Adicionar testes unitários de componentes;
* Adicionar testes de integração da interface;
* Aumentar a cobertura dos fluxos críticos;
* Refinar a sincronização Socket.IO;
* Melhorar feedbacks de loading e erros;
* Evoluir acessibilidade;
* Finalizar configuração Docker Full Stack;
* Evoluir documentação visual da aplicação.

---

# Fluxo da aplicação

O fluxo principal da aplicação pode ser resumido em:

```text
Login
  │
  ▼
Dashboard / Tickets
  │
  ├── Listar tickets
  │
  ├── Filtrar tickets
  │
  ├── Criar ticket
  │
  ├── Editar ticket
  │
  ├── Excluir ticket
  │
  └── Ver detalhes
          │
          ├── Alterar status
          ├── Alterar prioridade
          ├── Atribuir responsável
          └── Adicionar comentários
```

---

# Repositórios

### Front-end

**Internal Ticket System UI**

```text
https://github.com/leticia-gomes/internal-ticket-system-ui
```

### Back-end

**Internal Ticket System API**

```text
https://github.com/leticia-gomes/internal-ticket-system-api
```

---

# Autora

**Letícia Gomes Ribeiro**

Projeto desenvolvido como parte de um **desafio técnico Full Stack**, com foco em desenvolvimento de interfaces modernas utilizando Vue 3 e integração com API REST em Node.js.

---

# Licença

Este projeto foi desenvolvido para fins de **avaliação técnica**.
