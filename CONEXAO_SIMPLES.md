# 🎯 RESUMO DA CONEXÃO - GUIA VISUAL

## 📊 Diagrama Simplificado

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Cliente)                      │
│                   http://localhost:5173                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐        ┌──────────────┐                 │
│  │   Dashboard  │───────▶│    Store     │                 │
│  │   (UI/UX)    │        │  (Zustand)   │                 │
│  └──────────────┘        └──────┬───────┘                 │
│                                  │                          │
│                          ┌───────▼────────┐                │
│                          │  API Service   │                │
│                          │  (fetch/HTTP)  │                │
│                          └───────┬────────┘                │
└──────────────────────────────────┼──────────────────────────┘
                                   │
                       HTTP Request │ (JSON)
                                   │
┌──────────────────────────────────▼──────────────────────────┐
│                     SERVIDOR (API)                          │
│                  http://localhost:3000                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐        ┌──────────────┐                 │
│  │   Express    │───────▶│    Routes    │                 │
│  │   Server     │        │   /api/*     │                 │
│  └──────────────┘        └──────┬───────┘                 │
│                                  │                          │
│                          ┌───────▼────────┐                │
│                          │  Controllers   │                │
│                          │   (Lógica)     │                │
│                          └───────┬────────┘                │
│                                  │                          │
│                          ┌───────▼────────┐                │
│                          │   DB Config    │                │
│                          │  (mysql2)      │                │
│                          └───────┬────────┘                │
└──────────────────────────────────┼──────────────────────────┘
                                   │
                         SQL Query │
                                   │
┌──────────────────────────────────▼──────────────────────────┐
│                   BANCO DE DADOS (MySQL)                    │
│                     localhost:3306                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Database: dashboard_api                                    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   produtos   │  │  vendedores  │  │   pedidos    │    │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤    │
│  │ 10 registros │  │ 5 registros  │  │ 10 registros │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados na Prática

### Exemplo: Carregar Métricas do Dashboard

```
1. USUÁRIO ABRE DASHBOARD
   ↓
   src/pages/Dashboard.tsx
   useEffect(() => fetchMetrics())

2. STORE ZUSTAND DISPARA AÇÃO
   ↓
   src/store/dashboardStore.ts
   fetchMetrics: async () => {...}

3. SERVIÇO FAZ FETCH
   ↓
   src/services/api.ts
   fetch('http://localhost:3000/api/dashboard/metricas')

4. API RECEBE REQUEST
   ↓
   api/src/server.js
   app.use('/api/dashboard', dashboardRoutes)

5. ROTA DIRECIONA
   ↓
   api/src/routes/dashboardRoutes.js
   router.get('/metricas', controller.getMetricas)

6. CONTROLLER EXECUTA QUERY
   ↓
   api/src/controllers/dashboardController.js
   const sql = "SELECT SUM(valor_total) FROM pedidos"
   const result = await query(sql)

7. DB CONFIG CONECTA MYSQL
   ↓
   api/src/config/db.js
   pool.execute(sql)

8. MYSQL PROCESSA
   ↓
   MySQL Server
   Executa query e retorna dados

9. RESPOSTA VOLTA
   ↓
   MySQL → Controller → Route → Server → HTTP Response

10. STORE ATUALIZA ESTADO
    ↓
    set({ metrics: data })

11. UI RENDERIZA
    ↓
    <MetricCard value={metrics.total_vendas} />
```

---

## 📝 Arquivos Envolvidos

### 🎨 Frontend (Dashboard)

| Arquivo | Função | Linha de Código Chave |
|---------|--------|----------------------|
| `src/pages/Dashboard.tsx` | UI | `const { metrics } = useDashboardStore()` |
| `src/store/dashboardStore.ts` | Estado | `fetchMetrics: async () => {...}` |
| `src/services/api.ts` | HTTP | `fetch('http://localhost:3000/api/...')` |

### ⚙️ Backend (API)

| Arquivo | Função | Linha de Código Chave |
|---------|--------|----------------------|
| `api/src/server.js` | Servidor | `app.listen(3000)` |
| `api/src/routes/dashboardRoutes.js` | Rotas | `router.get('/metricas', ...)` |
| `api/src/controllers/dashboardController.js` | Lógica | `const result = await query(sql)` |
| `api/src/config/db.js` | Conexão | `mysql.createPool({...})` |

### 💾 Database (MySQL)

| Arquivo | Função | Linha de Código Chave |
|---------|--------|----------------------|
| `api/database.sql` | Schema | `CREATE TABLE produtos (...)` |
| `api/.env` | Config | `DB_HOST=localhost` |

---

## 🎯 Pontos de Configuração

### 1. URL da API no Frontend

```typescript
// src/services/api.ts
const BASE_URL = 'http://localhost:3000/api'
```

### 2. Porta da API

```javascript
// api/src/server.js
const PORT = process.env.PORT || 3000
app.listen(PORT)
```

### 3. Credenciais do MySQL

```env
# api/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=dashboard_api
DB_PORT=3306
```

### 4. CORS (Permitir Frontend)

```javascript
// api/src/server.js
app.use(cors())  // Permite localhost:5173
```

---

## ✅ Checklist de Conexão

Marque quando tudo estiver funcionando:

### MySQL
- [ ] Serviço rodando (`Get-Service MySQL*`)
- [ ] Banco criado (`SHOW DATABASES;`)
- [ ] Tabelas criadas (`SHOW TABLES;`)
- [ ] Dados inseridos (`SELECT COUNT(*) FROM produtos;`)

### API
- [ ] Dependências instaladas (`npm install` na pasta api/)
- [ ] Arquivo .env configurado
- [ ] Servidor iniciado (`npm start`)
- [ ] Console mostra "Conectado ao MySQL"
- [ ] Endpoint responde (`http://localhost:3000/api/dashboard/metricas`)

### Dashboard
- [ ] Dependências instaladas (`npm install`)
- [ ] Servidor iniciado (`npm run dev`)
- [ ] Acesso no navegador (`http://localhost:5173`)
- [ ] Login funciona
- [ ] Bolinha verde "Conectado ao banco de dados MySQL"
- [ ] Métricas carregam com valores reais

---

## 🧪 Testes Rápidos

### Teste 1: MySQL Funcionando
```powershell
mysql -u root -p
USE dashboard_api;
SELECT * FROM produtos LIMIT 1;
```

✅ Deve mostrar um produto

---

### Teste 2: API Respondendo
```powershell
curl http://localhost:3000/api/dashboard/metricas
```

✅ Deve retornar JSON com métricas

---

### Teste 3: Dashboard Conectado

1. Abra: http://localhost:5173
2. Faça login
3. Veja a bolinha de status no topo
4. Observe as métricas

✅ Bolinha verde = Tudo conectado!

---

## 🚨 Problemas Comuns

### "Cannot GET /api/dashboard/metricas"

**Solução:**
```powershell
cd api
npm start
# API não está rodando
```

---

### "Access denied for user 'root'"

**Solução:**
```powershell
# Edite api/.env com a senha correta
DB_PASSWORD=sua_senha_aqui
```

---

### "CORS Error"

**Solução:**
```javascript
// api/src/server.js
// Adicione antes das rotas
const cors = require('cors')
app.use(cors())
```

---

### "Bolinha amarela no Dashboard"

**Solução:**
```
1. Verifique se a API está rodando (porta 3000)
2. Verifique se o MySQL está rodando
3. Veja o console do navegador (F12) para erros
```

---

## 🎉 Está Tudo Conectado Quando...

```
✅ Terminal 1: API mostra "Conectado ao MySQL"
✅ Terminal 2: Dashboard mostra "ready in...ms"
✅ Navegador: Bolinha verde no topo
✅ Navegador: Métricas com valores reais
✅ Console: Sem erros
```

---

## 💡 Comandos Úteis

### Iniciar tudo de uma vez

**Terminal 1:**
```powershell
cd api
npm start
```

**Terminal 2:**
```powershell
npm run dev
```

### Ver logs em tempo real

**MySQL:**
```sql
SHOW PROCESSLIST;
```

**API:**
```javascript
// Já tem console.log em api/src/server.js
```

**Dashboard:**
```
Abra DevTools (F12) → Console
```

---

## 📞 Resumo Ultra-Rápido

```
1. MySQL rodando? ✓
2. API iniciada? (cd api && npm start) ✓
3. Dashboard iniciado? (npm run dev) ✓
4. Acesse http://localhost:5173 ✓
5. Bolinha verde? ✓

🎉 TUDO CONECTADO!
```
