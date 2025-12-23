import { create } from 'zustand'

export interface Transaction {
  id: string
  user: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  date: string
  category: string
}

interface DashboardState {
  transactions: Transaction[]
  loading: boolean
  fetchTransactions: () => Promise<void>
}

// Função auxiliar para gerar dados fictícios
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

export const useDashboardStore = create<DashboardState>((set) => ({
  transactions: [],
  loading: false,

  fetchTransactions: async () => {
    set({ loading: true })
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    set({
      transactions: generateMockTransactions(),
      loading: false
    })
  }
}))
