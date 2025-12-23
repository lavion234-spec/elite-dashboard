# 📊 Dashboard Administrativo Front-End

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

Um dashboard administrativo moderno e profissional construído com React, TypeScript, e Tailwind CSS, demonstrando as melhores práticas de desenvolvimento front-end.

## ✨ Características

### 🎨 Interface e UX
- ✅ Design moderno, minimalista e profissional
- ✅ Tema claro e escuro (alternância suave)
- ✅ Interface totalmente responsiva (desktop, tablet, mobile)
- ✅ Navegação lateral (sidebar) com animações suaves
- ✅ Ícones profissionais com Lucide React

### 🧩 Arquitetura
- ✅ Estrutura de pastas bem organizada
- ✅ Componentes reutilizáveis (Cards, Tabelas, Botões, Inputs, Modal)
- ✅ TypeScript para type safety
- ✅ Código limpo e comentado

### 🧠 Gerenciamento de Estado
- ✅ Zustand para gerenciamento de estado global
- ✅ Persist middleware para dados persistentes
- ✅ Estados para: autenticação, tema, dados do dashboard

### 📊 Gráficos e Visualizações
- ✅ Recharts para gráficos profissionais
- ✅ Gráfico de linha (evolução temporal)
- ✅ Gráfico de barras (comparações)
- ✅ Gráfico de pizza/donut (distribuição)
- ✅ Gráfico de área (tendências)

### 📑 Tabela Avançada
- ✅ Busca em tempo real
- ✅ Ordenação por colunas
- ✅ Filtros por status
- ✅ Paginação funcional
- ✅ Loading skeleton

### 🔌 Integração com API
- ✅ JSON Server para mock API
- ✅ Atualização dinâmica de dados
- ✅ Loading states

### 🔐 Autenticação
- ✅ Tela de login profissional
- ✅ Autenticação fake com token
- ✅ LocalStorage para persistência
- ✅ Rotas protegidas

## 🚀 Tecnologias Utilizadas

- **React 18.2** - Biblioteca JavaScript para UI
- **TypeScript 5.2** - Superset JavaScript com tipagem estática
- **Vite 5.0** - Build tool moderna e rápida
- **Tailwind CSS 3.3** - Framework CSS utility-first
- **Zustand 4.4** - Gerenciamento de estado minimalista
- **React Router 6.20** - Roteamento para aplicações React
- **Recharts 2.10** - Biblioteca de gráficos para React
- **Lucide React 0.294** - Ícones modernos e leves
- **JSON Server 0.17** - API REST fake para desenvolvimento

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passo a passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd "PROJETO DASH BOARD"
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Inicie o mock API (em outro terminal)**
```bash
npm run server
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

## 🎯 Scripts Disponíveis

```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Cria build de produção
npm run preview    # Preview da build de produção
npm run server     # Inicia o JSON Server (mock API)
npm run lint       # Executa o linter
```

## 📁 Estrutura do Projeto

```
PROJETO DASH BOARD/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Layout/
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── MetricCard.tsx
│   │   └── Table.tsx
│   ├── pages/               # Páginas da aplicação
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx
│   │   ├── Users.tsx
│   │   └── Settings.tsx
│   ├── store/               # Gerenciamento de estado
│   │   ├── authStore.ts
│   │   ├── themeStore.ts
│   │   └── dashboardStore.ts
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globais
├── db.json                  # Mock API data
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 Funcionalidades Detalhadas

### 1. Autenticação
- Tela de login responsiva e moderna
- Autenticação fake (qualquer e-mail/senha)
- Token armazenado em localStorage
- Redirecionamento automático
- Proteção de rotas

### 2. Dashboard
- 4 cards de métricas com ícones
- Gráfico de linha (evolução mensal)
- Gráfico de pizza (distribuição por categoria)
- Cards de status (completos, pendentes, falhados)
- Tabela de transações com filtros e paginação

### 3. Analytics
- Gráfico de barras (receita vs despesas)
- Gráfico de área (usuários semanais)
- Gráfico de barras horizontal (top produtos)
- Cards de insights com gradientes

### 4. Usuários
- Grid de cards de usuários
- Estatísticas de usuários (total, ativos, inativos, admins)
- Modal para adicionar novos usuários
- Avatar gerado automaticamente

### 5. Configurações
- Alternância de tema (claro/escuro)
- Configurações de notificações (e-mail, push, SMS)
- Opções de segurança
- Edição de perfil

### 6. Tema Dark/Light
- Alternância suave entre temas
- Persistência da preferência
- Cores otimizadas para ambos os temas
- Ícones animados

### 7. Tabela Avançada
- Busca global em tempo real
- Ordenação crescente/decrescente
- Filtro por status
- Paginação com controles
- Responsiva e acessível

## 📸 Screenshots

### Dashboard - Tema Claro
<img width="1848" height="924" alt="image" src="https://github.com/user-attachments/assets/15ef2cab-affc-4056-9caa-49a9eab9b1c1" />



### Dashboard - Tema Escuro
 <img width="1319" height="906" alt="image" src="https://github.com/user-attachments/assets/925a8f55-f39c-436c-aa70-2c12d4465cb7" />


### Login
<img width="1324" height="904" alt="image" src="https://github.com/user-attachments/assets/14627d3c-94ee-4952-8bc4-c3da45c12724" />


### Analytics
<img width="1870" height="920" alt="image" src="https://github.com/user-attachments/assets/06285b76-6f5f-4a43-ac76-4e4e217f1749" />


## 🔧 Personalização

### Cores
Edite o arquivo `tailwind.config.js` para personalizar as cores:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores aqui
      }
    }
  }
}
```

### Mock API
Edite o arquivo `db.json` para adicionar/modificar dados:
```json
{
  "transactions": [...],
  "users": [...],
  "metrics": {...}
}
```

## 🏆 Boas Práticas Implementadas

- ✅ Componentização adequada
- ✅ TypeScript para type safety
- ✅ Estado centralizado com Zustand
- ✅ Código limpo e organizado
- ✅ Responsividade em todos os dispositivos
- ✅ Acessibilidade (ARIA labels, focus states)
- ✅ Performance otimizada
- ✅ Loading states e skeleton screens
- ✅ Tratamento de erros
- ✅ Commits semânticos

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para demonstrar habilidades profissionais em desenvolvimento front-end.

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
