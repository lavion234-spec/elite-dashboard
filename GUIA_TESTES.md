# 🧪 GUIA DE TESTE - GERENCIAMENTO DE PRODUTOS

## 🚀 Como Testar as Novas Funcionalidades

### ✅ Pré-requisitos

1. MySQL instalado e rodando
2. Banco de dados criado: `dashboard_api`
3. API rodando: `cd api && npm start`
4. Dashboard rodando: `npm run dev`

---

## 📋 ROTEIRO DE TESTES

### 1️⃣ Acessar Página de Produtos

```
1. Abrir http://localhost:5173
2. Fazer login (qualquer credencial)
3. Clicar em "Produtos" na sidebar (ícone 📦)
4. Aguardar carregamento dos produtos
```

**Resultado Esperado:**
- ✅ Página carrega sem erros
- ✅ Top 5 produtos aparece no topo (se houver vendas)
- ✅ Tabela de produtos aparece
- ✅ Botão "Novo Produto" visível

---

### 2️⃣ Cadastrar Novo Produto

```
1. Clicar em "Novo Produto"
2. Preencher formulário:
   Nome: "Notebook Dell Inspiron"
   Descrição: "Notebook 15 polegadas, 8GB RAM"
   Preço: 2500.00
   Custo: 1800.00
   Estoque: 15
   Categoria: Eletrônicos
3. Clicar em "Cadastrar"
```

**Resultado Esperado:**
- ✅ Modal fecha
- ✅ Toast verde aparece: "Produto cadastrado com sucesso!"
- ✅ Produto aparece na tabela instantaneamente
- ✅ Dados corretos exibidos

**Verificar no MySQL:**
```sql
SELECT * FROM produtos ORDER BY id DESC LIMIT 1;
```

---

### 3️⃣ Testar Validações

```
1. Clicar em "Novo Produto"
2. Tentar salvar SEM preencher nome
3. Verificar toast amarelo: "Nome é obrigatório"

4. Preencher nome: "Teste"
5. Preço: -100 (negativo)
6. Verificar toast: "Preço inválido"

7. Preço: 100
8. Custo: 150 (maior que preço)
9. Verificar toast: "Custo deve ser menor que o preço"
```

**Resultado Esperado:**
- ✅ Todas as validações funcionam
- ✅ Produto NÃO é salvo com dados inválidos
- ✅ Toasts aparecem com mensagens corretas

---

### 4️⃣ Editar Produto

```
1. Na tabela, clicar no ícone de lápis (✏️) de um produto
2. Modal abre com dados preenchidos
3. Alterar:
   Nome: "[Produto] - EDITADO"
   Preço: Aumentar em R$ 100
4. Clicar em "Atualizar"
```

**Resultado Esperado:**
- ✅ Modal fecha
- ✅ Toast verde: "Produto atualizado com sucesso!"
- ✅ Tabela atualiza com novos dados
- ✅ Mudanças persistidas no MySQL

**Verificar no MySQL:**
```sql
SELECT nome, preco FROM produtos WHERE id = [ID];
```

---

### 5️⃣ Excluir Produto

```
1. Na tabela, clicar no ícone de lixeira (🗑️)
2. Diálogo de confirmação aparece
3. Ler mensagem: "Tem certeza? Esta ação não pode ser desfeita."
4. Clicar em "Excluir"
```

**Resultado Esperado:**
- ✅ Diálogo fecha
- ✅ Toast verde: "Produto excluído com sucesso!"
- ✅ Produto some da tabela instantaneamente
- ✅ Removido do MySQL

**Verificar no MySQL:**
```sql
SELECT * FROM produtos WHERE id = [ID];
-- Deve retornar 0 resultados
```

---

### 6️⃣ Testar Cancelamento

```
1. Clicar em "Novo Produto"
2. Preencher alguns campos
3. Clicar em "Cancelar"
```

**Resultado Esperado:**
- ✅ Modal fecha
- ✅ Nada é salvo
- ✅ Dados não aparecem na tabela

```
1. Clicar no ícone de lixeira
2. Clicar em "Cancelar" no diálogo
```

**Resultado Esperado:**
- ✅ Diálogo fecha
- ✅ Produto NÃO é excluído
- ✅ Permanece na tabela

---

### 7️⃣ Ver Top 5 Produtos

```
1. Na página de Produtos, ver cards no topo
2. Ir para Analytics (sidebar)
3. Ver gráfico de barras horizontal "Top 5 Produtos Mais Vendidos"
```

**Resultado Esperado:**
- ✅ Mesmos produtos aparecem em ambas as páginas
- ✅ Dados vêm do MySQL em tempo real
- ✅ Ordenados por total vendido (maior primeiro)
- ✅ Mostra quantidade vendida e valor total

**Se não houver vendas:**
- ✅ Mensagem: "Nenhum produto vendido ainda"
- ✅ Ícone de pacote vazio

---

### 8️⃣ Testar Indicadores de Estoque

```
1. Criar produto com estoque > 10
   Resultado: Badge VERDE
   
2. Criar produto com estoque 1-10
   Resultado: Badge AMARELO
   
3. Criar produto com estoque 0
   Resultado: Badge VERMELHO
```

**Resultado Esperado:**
- ✅ Cores corretas baseadas no estoque
- ✅ Fácil identificação visual

---

### 9️⃣ Testar Responsividade

```
1. Redimensionar janela do navegador
2. Testar em diferentes tamanhos:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)
```

**Resultado Esperado:**
- ✅ Tabela scrollável horizontalmente em mobile
- ✅ Cards de Top 5 empilham em mobile
- ✅ Modal adapta tamanho
- ✅ Botões ficam acessíveis
- ✅ Texto não quebra de forma estranha

---

### 🔟 Testar Integração com API

```
1. Parar a API (Ctrl+C no terminal da API)
2. Tentar cadastrar produto
```

**Resultado Esperado:**
- ✅ Toast vermelho: "Erro ao criar produto"
- ✅ Produto NÃO aparece na lista
- ✅ Sistema não quebra

```
1. Reiniciar API
2. Recarregar página de produtos (F5)
```

**Resultado Esperado:**
- ✅ Produtos carregam normalmente
- ✅ Tudo volta a funcionar

---

## 🎯 CHECKLIST COMPLETO

### Funcionalidades Básicas
- [ ] Listar todos os produtos
- [ ] Ver Top 5 produtos mais vendidos
- [ ] Cadastrar novo produto
- [ ] Editar produto existente
- [ ] Excluir produto
- [ ] Cancelar operações

### Validações
- [ ] Nome obrigatório
- [ ] Preço positivo
- [ ] Custo positivo
- [ ] Custo menor que preço
- [ ] Estoque não negativo
- [ ] Campos numéricos validados

### UX/UI
- [ ] Toasts de sucesso (verde)
- [ ] Toasts de erro (vermelho)
- [ ] Toasts de aviso (amarelo)
- [ ] Diálogo de confirmação
- [ ] Loading indicators
- [ ] Badges de estoque coloridos
- [ ] Animações suaves
- [ ] Hover effects

### Integração
- [ ] Dados salvos no MySQL
- [ ] API responde corretamente
- [ ] Dashboard atualiza em tempo real
- [ ] Top 5 recalcula automaticamente
- [ ] Analytics mostra dados corretos

### Performance
- [ ] Carregamento rápido (< 2s)
- [ ] Operações instantâneas
- [ ] Sem travamentos
- [ ] Sem memory leaks

### Responsividade
- [ ] Desktop funciona
- [ ] Tablet funciona
- [ ] Mobile funciona
- [ ] Orientação landscape/portrait

---

## 🔍 TESTES NO MYSQL

### Ver todos os produtos:
```sql
SELECT * FROM produtos ORDER BY created_at DESC;
```

### Ver top 5:
```sql
SELECT 
  p.id,
  p.nome,
  SUM(pi.quantidade * pi.preco_unitario) as total_vendido,
  SUM(pi.quantidade) as quantidade_total
FROM produtos p
LEFT JOIN pedidos_items pi ON p.id = pi.produto_id
LEFT JOIN pedidos pe ON pi.pedido_id = pe.id
WHERE pe.status = 'concluido'
GROUP BY p.id, p.nome
ORDER BY total_vendido DESC
LIMIT 5;
```

### Contar produtos:
```sql
SELECT COUNT(*) as total FROM produtos;
```

### Ver produtos por categoria:
```sql
SELECT categoria, COUNT(*) as quantidade
FROM produtos
GROUP BY categoria;
```

---

## 📊 MÉTRICAS DE SUCESSO

### Performance:
- ✅ Lista de produtos carrega em < 1s
- ✅ Cadastro/edição/exclusão em < 500ms
- ✅ Top 5 atualiza em < 1s
- ✅ Sem lag na interface

### UX:
- ✅ 100% das validações funcionam
- ✅ Feedback visual em todas as ações
- ✅ Nenhuma ação sem confirmação
- ✅ Estados de loading visíveis

### Confiabilidade:
- ✅ 0 erros no console
- ✅ 100% dos dados salvos corretamente
- ✅ Sincronização perfeita MySQL ↔ UI
- ✅ Sistema não quebra com API offline

---

## 🆘 TROUBLESHOOTING

### "Nenhum produto aparece"
```
1. Verificar se API está rodando
2. Verificar se MySQL está rodando
3. Ver console do navegador (F12)
4. Ver logs da API
```

### "Erro ao cadastrar"
```
1. Verificar valores do formulário
2. Ver mensagem de erro no toast
3. Verificar logs da API
4. Testar query SQL manualmente
```

### "Top 5 vazio"
```
1. Verificar se há pedidos concluídos
2. Executar query SQL manual
3. Verificar se produtos têm pedidos_items
```

---

## 🎉 RESULTADO ESPERADO

Ao final dos testes:

✅ **Todos os CRUDs funcionando perfeitamente**
✅ **Dados fluindo: MySQL → API → Dashboard**
✅ **Top 5 produtos atualizado em tempo real**
✅ **Validações protegendo dados**
✅ **UX profissional e intuitiva**
✅ **Zero erros no console**
✅ **Sistema 100% integrado**

---

## 📝 RELATÓRIO DE BUGS

Se encontrar algum problema, documente:

```
❌ Bug encontrado:
- O que tentou fazer:
- O que esperava:
- O que aconteceu:
- Mensagem de erro:
- Console logs:
- Quando ocorre:
```

---

## 🚀 PRÓXIMOS PASSOS

Depois de validar tudo:

1. ✅ Testar com mais usuários
2. ✅ Adicionar mais produtos
3. ✅ Criar pedidos para ver Top 5
4. ✅ Explorar Analytics
5. ✅ Testar edge cases
6. ✅ Otimizar performance
7. ✅ Deploy em produção

**Tudo pronto para usar! 🎊**
