import { create } from 'zustand'
import api from '../services/api'

// ============================================
// TIPOS E INTERFACES
// ============================================

export interface Transaction {
  id: string
  user: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  date: string
  category: string
}

export interface DashboardMetrics {
  total_vendas: number
  total_gastos: number
  total_lucro: number
  margem_lucro: number
  vendas_mes_atual: number
  vendas_mes_anterior: number
  crescimento_percentual: number
}

export interface Product {
  id: number
  nome: string
  preco: number
  estoque: number
  categoria_id: number | null
}

export interface Seller {
  id: number
  nome: string
  email: string
  comissao_percentual: number
  meta_mensal: number
}

export interface Order {
  id: number
  vendedor_nome?: string
  cliente_nome: string
  data_pedido: string
  status: string
  valor_total: number
}

interface DashboardState {
  // Estado
  transactions: Transaction[]
  metrics: DashboardMetrics | null
  products: Product[]
  sellers: Seller[]
  orders: Order[]
  loading: boolean
  error: string | null
  apiConnected: boolean
  
  // Ações
  fetchTransactions: () => Promise<void>
  fetchMetrics: () => Promise<void>
  fetchProducts: () => Promise<void>
  fetchSellers: () => Promise<void>
  fetchOrders: () => Promise<void>
  fetchAllData: () => Promise<void>
  checkApiConnection: () => Promise<boolean>
}

// ============================================
// FALLBACK - DADOS MOCK (caso API não esteja disponível)
// ============================================

const generateMockTransactions = (): Transaction[] => {
  const statuses: Transaction['status'][] = ['completed', 'pending', 'failed']
  const categories = ['Vendas', 'Assinatura', 'Produto', 'Serviço', 'Consultoria']
  const users = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza', 'Fernanda Lima']
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `TXN-${String(i + 1).padStart(4, '0')}`,
    user: users[Math.floor(Math.random() * users.length)],
    amount: Math.floor(Math.random() * 10000) + 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    category: categories[Math.floor(Math.random() * categories.length)]
  }))
}

// ============================================
// STORE COM CONEXÃO À API REAL
// ============================================

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Estado inicial
  transactions: [],
  metrics: null,
  products: [],
  sellers: [],
  orders: [],
  loading: false,
  error: null,
  apiConnected: false,

  // Verificar conexão com a API
  checkApiConnection: async () => {
    try {
      const isConnected = await api.checkHealth()
      set({ apiConnected: isConnected })
      console.log(isConnected ? '✅ API conectada!' : '⚠️ API não disponível, usando dados mock')
      return isConnected
    } catch (error) {
      set({ apiConnected: false })
      console.warn('⚠️ API não disponível, usando dados mock')
      return false
    }
  },

  // Buscar métricas do dashboard
  fetchMetrics: async () => {
    try {
      set({ loading: true, error: null })
      const metrics = await api.dashboard.getMetrics()
      set({ metrics, loading: false })
    } catch (error) {
      console.error('Erro ao buscar métricas:', error)
      set({ 
        error: 'Erro ao buscar métricas', 
        loading: false,
        metrics: {
          total_vendas: 38690.62,
          total_gastos: 24850.00,
          total_lucro: 13840.62,
          margem_lucro: 35.77,
          vendas_mes_atual: 15420.00,
          vendas_mes_anterior: 12300.00,
          crescimento_percentual: 25.37
        }
      })
    }
  },

  // Buscar transações (pedidos)
  fetchTransactions: async () => {
    try {
      set({ loading: true, error: null })
      
      const isConnected = await get().checkApiConnection()
      
      if (isConnected) {
        // Usar API real
        const orders = await api.orders.getAll()
        
        // Converter pedidos para formato de transações
        const transactions: Transaction[] = orders.map(order => ({
          id: `TXN-${String(order.id).padStart(4, '0')}`,
          user: order.cliente_nome,
          amount: order.valor_total,
          status: order.status === 'concluido' ? 'completed' : 
                  order.status === 'pendente' ? 'pending' : 'failed',
          date: order.data_pedido,
          category: 'Pedido'
        }))
        
        set({ transactions, loading: false })
      } else {
        // Usar dados mock
        await new Promise(resolve => setTimeout(resolve, 500))
        set({ transactions: generateMockTransactions(), loading: false })
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error)
      set({ 
        error: 'Erro ao buscar transações', 
        loading: false,
        transactions: generateMockTransactions()
      })
    }
  },

  // Buscar produtos
  fetchProducts: async () => {
    try {
      set({ loading: true, error: null })
      const products = await api.products.getAll()
      set({ products, loading: false })
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      set({ error: 'Erro ao buscar produtos', loading: false, products: [] })
    }
  },

  // Buscar vendedores
  fetchSellers: async () => {
    try {
      set({ loading: true, error: null })
      const sellers = await api.sellers.getAll()
      set({ sellers, loading: false })
    } catch (error) {
      console.error('Erro ao buscar vendedores:', error)
      set({ error: 'Erro ao buscar vendedores', loading: false, sellers: [] })
    }
  },

  // Buscar pedidos
  fetchOrders: async () => {
    try {
      set({ loading: true, error: null })
      const orders = await api.orders.getAll()
      set({ orders, loading: false })
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
      set({ error: 'Erro ao buscar pedidos', loading: false, orders: [] })
    }
  },

  // Buscar todos os dados de uma vez
  fetchAllData: async () => {
    set({ loading: true, error: null })
    
    await get().checkApiConnection()
    
    await Promise.all([
      get().fetchMetrics(),
      get().fetchTransactions(),
      get().fetchProducts(),
      get().fetchSellers(),
      get().fetchOrders()
    ])
    
    set({ loading: false })
  }
}))
