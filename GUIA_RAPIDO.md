# 🚀 Guia Rápido - Dashboard Administrativo

## ⚡ Como Iniciar

### 1️⃣ Primeiro Acesso

```bash
# Certifique-se de que as dependências estão instaladas
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Em outro terminal, inicie o Mock API (opcional)
npm run server
```

### 2️⃣ Acessar a Aplicação

1. Abra o navegador em: `http://localhost:5173`
2. Você verá a tela de login
3. **Use qualquer e-mail e senha** para fazer login (é uma autenticação fake)
4. Exemplos:
   - Email: `admin@teste.com`
   - Senha: `123456`

## 📱 Páginas Disponíveis

### 🏠 Dashboard (`/dashboard`)
- Visão geral com métricas
- Gráficos de evolução mensal e distribuição
- Tabela de transações com busca e filtros
- Cards de status

### 📊 Analytics (`/analytics`)
- Gráfico de barras (Receita vs Despesas)
- Gráfico de área (Usuários Semanais)
- Gráfico horizontal (Top 5 Produtos)
- Cards de insights

### 👥 Usuários (`/users`)
- Grid de usuários cadastrados
- Estatísticas (Total, Ativos, Inativos, Admins)
- Adicionar novo usuário via modal
- Avatares gerados automaticamente

### ⚙️ Configurações (`/settings`)
- Alternar tema (claro/escuro)
- Configurar notificações
- Opções de segurança
- Editar perfil

## 🎨 Recursos Principais

### Tema Dark/Light
- Clique no ícone de lua/sol no header
- A preferência é salva automaticamente
- Funciona em todas as páginas

### Tabela Avançada
- **Buscar**: Digite qualquer termo no campo de busca
- **Filtrar**: Use o dropdown para filtrar por status
- **Ordenar**: Clique nos cabeçalhos das colunas
- **Paginar**: Use os botões no rodapé da tabela

### Sidebar
- Clique no ícone de menu (≡) no header para expandir/recolher
- Navegue entre as páginas clicando nos itens
- Ícones animados ao passar o mouse

### Adicionar Usuário
1. Na página de Usuários, clique em "Adicionar Usuário"
2. Preencha o formulário no modal
3. Clique em "Adicionar"
4. O novo usuário aparecerá no grid

## 🔐 Logout
- Clique no avatar no canto superior direito
- Selecione "Sair" no menu dropdown
- Você será redirecionado para a tela de login

## 📊 Mock API (JSON Server)

Se quiser dados dinâmicos da API:

```bash
# Terminal 1: Servidor de desenvolvimento
npm run dev

# Terminal 2: Mock API
npm run server
```

A API estará disponível em: `http://localhost:3001`

Endpoints:
- `GET /users` - Lista usuários
- `GET /transactions` - Lista transações
- `GET /metrics` - Métricas gerais

## 🛠️ Build de Produção

```bash
# Criar build otimizada
npm run build

# Preview da build
npm run preview
```

Os arquivos serão gerados na pasta `dist/`

## 💡 Dicas

1. **Responsividade**: Teste em diferentes tamanhos de tela
2. **Performance**: Os gráficos são otimizados e responsivos
3. **Acessibilidade**: Todos os componentes têm estados de focus
4. **Loading**: Skeleton screens aparecem durante carregamentos
5. **Persistência**: Login e tema são salvos no localStorage

## 🎯 Casos de Uso para Demonstração

### Para Recrutadores/Entrevistadores:

1. **Arquitetura**
   - Mostre a estrutura de pastas organizada
   - Explique a separação de concerns (components, pages, store)

2. **State Management**
   - Demonstre Zustand (mais simples que Redux)
   - Mostre a persistência de dados

3. **TypeScript**
   - Tipos bem definidos em todos os componentes
   - Interfaces para props e estados

4. **Responsividade**
   - Redimensione a janela
   - Teste no mobile (F12 > Device Toolbar)

5. **Componentização**
   - Componentes reutilizáveis (Button, Input, Modal, Table)
   - Props bem tipadas

6. **UX/UI**
   - Animações suaves
   - Feedback visual (hover, focus, loading)
   - Tema dark/light

## 📈 Próximos Passos (Para Expansão)

- [ ] Integração com API real (substituir JSON Server)
- [ ] Testes unitários (Jest + React Testing Library)
- [ ] Testes E2E (Cypress ou Playwright)
- [ ] Internacionalização (i18n)
- [ ] PWA (Service Workers)
- [ ] Storybook para documentação de componentes
- [ ] CI/CD com GitHub Actions
- [ ] Deploy (Vercel, Netlify, ou AWS)

## 🐛 Troubleshooting

### Porta já em uso
```bash
# Se a porta 5173 estiver ocupada
# Vite automaticamente usará outra porta
# Verifique o terminal para ver a URL correta
```

### Dependências não instaladas
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de compilação TypeScript
```bash
# Verificar erros
npx tsc --noEmit
```

## 📞 Suporte

Para dúvidas ou sugestões, consulte:
- [Documentação do React](https://react.dev)
- [Documentação do Vite](https://vitejs.dev)
- [Documentação do Tailwind CSS](https://tailwindcss.com)
- [Documentação do Zustand](https://zustand-demo.pmnd.rs)

---

✨ **Aproveite o dashboard e boa sorte em suas apresentações!** ✨
