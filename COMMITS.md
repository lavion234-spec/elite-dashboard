# 📝 Exemplos de Commits Semânticos

Este projeto segue o padrão de Conventional Commits para mensagens de commit claras e organizadas.

## Estrutura

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

## Tipos Principais

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação, ponto e vírgula, etc (não afeta o código)
- **refactor**: Refatoração de código
- **test**: Adicionar ou corrigir testes
- **chore**: Tarefas de build, configuração, etc
- **perf**: Melhorias de performance

## Exemplos Reais deste Projeto

```bash
# Configuração Inicial
git commit -m "chore: configurar projeto React + TypeScript com Vite"
git commit -m "chore: adicionar Tailwind CSS e dependências"
git commit -m "chore: configurar ESLint e Prettier"

# Componentes
git commit -m "feat(components): criar componente Button reutilizável"
git commit -m "feat(components): adicionar componente Input com validação"
git commit -m "feat(components): implementar componente Modal"
git commit -m "feat(components): criar MetricCard para dashboard"
git commit -m "feat(components): desenvolver Table com filtros e paginação"

# Layout
git commit -m "feat(layout): criar Sidebar com navegação"
git commit -m "feat(layout): implementar Header com menu de usuário"
git commit -m "feat(layout): adicionar Layout principal responsivo"

# Páginas
git commit -m "feat(pages): criar página de Login"
git commit -m "feat(pages): desenvolver Dashboard com métricas"
git commit -m "feat(pages): adicionar página Analytics com gráficos"
git commit -m "feat(pages): implementar página de Usuários"
git commit -m "feat(pages): criar página de Configurações"

# State Management
git commit -m "feat(store): configurar Zustand para gerenciamento de estado"
git commit -m "feat(store): criar authStore para autenticação"
git commit -m "feat(store): implementar themeStore para tema dark/light"
git commit -m "feat(store): adicionar dashboardStore para dados"

# Funcionalidades
git commit -m "feat(auth): implementar autenticação fake com localStorage"
git commit -m "feat(theme): adicionar alternância de tema claro/escuro"
git commit -m "feat(charts): integrar Recharts para gráficos"
git commit -m "feat(table): adicionar busca em tempo real"
git commit -m "feat(table): implementar ordenação por colunas"
git commit -m "feat(table): adicionar filtro por status"
git commit -m "feat(table): implementar paginação"

# Estilização
git commit -m "style(global): adicionar estilos globais e variáveis CSS"
git commit -m "style(components): melhorar responsividade de componentes"
git commit -m "style(theme): otimizar cores para modo escuro"
git commit -m "style(animations): adicionar animações suaves"

# Correções
git commit -m "fix(auth): corrigir redirecionamento após login"
git commit -m "fix(table): resolver problema de ordenação"
git commit -m "fix(theme): corrigir persistência do tema"
git commit -m "fix(sidebar): ajustar responsividade em mobile"

# Documentação
git commit -m "docs: criar README completo com instruções"
git commit -m "docs: adicionar GUIA_RAPIDO.md"
git commit -m "docs: documentar componentes principais"
git commit -m "docs: adicionar exemplos de uso"

# Refatoração
git commit -m "refactor(components): extrair lógica comum para hooks"
git commit -m "refactor(utils): criar funções auxiliares"
git commit -m "refactor(types): melhorar tipagem TypeScript"

# Performance
git commit -m "perf(charts): otimizar renderização de gráficos"
git commit -m "perf(table): adicionar useMemo para dados processados"
git commit -m "perf(components): implementar React.memo em componentes"

# API/Mock
git commit -m "feat(api): configurar JSON Server para mock API"
git commit -m "feat(api): criar dados mockados para transações"
git commit -m "feat(api): adicionar endpoints para usuários"

# Build
git commit -m "chore(build): otimizar configuração do Vite"
git commit -m "chore(deps): atualizar dependências"
git commit -m "chore(deps): adicionar Recharts e Lucide Icons"
```

## Boas Práticas

1. **Use o imperativo**: "adicionar" não "adicionado"
2. **Seja específico**: Descreva o que foi feito
3. **Limite de caracteres**: Até 72 caracteres no título
4. **Use escopo**: Facilita filtrar commits
5. **Relacione issues**: Use `#123` para referenciar issues

## Exemplos com Corpo e Rodapé

```bash
# Com corpo explicativo
git commit -m "feat(table): adicionar filtros avançados

Implementa sistema de filtros múltiplos na tabela:
- Filtro por status
- Filtro por categoria
- Filtro por data
- Combinação de filtros"

# Com breaking change
git commit -m "feat(auth)!: alterar estrutura do token

BREAKING CHANGE: formato do token foi alterado
Usuários precisarão fazer login novamente"

# Relacionando issue
git commit -m "fix(table): corrigir ordenação alfabética

Closes #42"
```

## Git Flow Sugerido

```bash
# 1. Criar branch para feature
git checkout -b feat/nome-da-feature

# 2. Fazer commits
git add .
git commit -m "feat(escopo): descrição"

# 3. Merge para main
git checkout main
git merge feat/nome-da-feature

# 4. Tag de versão
git tag -a v1.0.0 -m "Versão 1.0.0 - Dashboard completo"
```

## Ferramentas Úteis

### Commitizen
Para ajudar na criação de commits:
```bash
npm install -g commitizen
commitizen init cz-conventional-changelog --save-dev --save-exact
```

Usar: `git cz` ao invés de `git commit`

### Commitlint
Para validar mensagens de commit:
```bash
npm install --save-dev @commitlint/{cli,config-conventional}
```

## Changelog Automático

Com commits semânticos, você pode gerar changelog automaticamente:

```bash
npm install -g conventional-changelog-cli
conventional-changelog -p angular -i CHANGELOG.md -s
```

## Emoji (Opcional)

Alguns times gostam de adicionar emojis:

```bash
✨ feat: nova funcionalidade
🐛 fix: correção de bug
📚 docs: documentação
💄 style: estilização
♻️ refactor: refatoração
✅ test: testes
🔧 chore: configuração
⚡ perf: performance
```

Exemplo:
```bash
git commit -m "✨ feat(charts): adicionar gráfico de pizza"
```

---

Seguir essas convenções torna o histórico do projeto mais profissional e fácil de navegar! 🚀
