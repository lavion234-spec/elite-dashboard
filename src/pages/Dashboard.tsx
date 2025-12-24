import { useEffect } from 'react'
import { useDashboardStore } from '../store/dashboardStore'
import MetricCard from '../components/MetricCard'
import Table from '../components/Table'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { clsx } from 'clsx'

const lineChartData = [
  { name: 'Jan', vendas: 4000, lucro: 2400 },
  { name: 'Fev', vendas: 3000, lucro: 1398 },
  { name: 'Mar', vendas: 2000, lucro: 9800 },
  { name: 'Abr', vendas: 2780, lucro: 3908 },
  { name: 'Mai', vendas: 1890, lucro: 4800 },
  { name: 'Jun', vendas: 2390, lucro: 3800 },
  { name: 'Jul', vendas: 3490, lucro: 4300 },
]

const pieChartData = [
  { name: 'Vendas', value: 400, color: '#8b5cf6' },
  { name: 'Assinaturas', value: 300, color: '#ec4899' },
  { name: 'Produtos', value: 200, color: '#06b6d4' },
  { name: 'Serviços', value: 100, color: '#f59e0b' },
]

export default function Dashboard() {
  const { 
    transactions, 
    metrics, 
    loading, 
    apiConnected,
    fetchTransactions,
    fetchMetrics,
    checkApiConnection 
  } = useDashboardStore()

  useEffect(() => {
    // Verificar conexão e buscar dados ao montar o componente
    const initData = async () => {
      await checkApiConnection()
      await Promise.all([
        fetchTransactions(),
        fetchMetrics()
      ])
    }
    initData()
  }, [fetchTransactions, fetchMetrics, checkApiConnection])

  const columns = [
    {
      key: 'id' as const,
      label: 'ID',
      sortable: true,
      render: (value: string) => (
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{value}</span>
      )
    },
    {
      key: 'user' as const,
      label: 'Usuário',
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
      )
    },
    {
      key: 'amount' as const,
      label: 'Valor',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      )
    },
    {
      key: 'status' as const,
      label: 'Status',
      sortable: true,
      render: (value: string) => {
        const styles = {
          completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
          pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
          failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }
        const labels = {
          completed: 'Completo',
          pending: 'Pendente',
          failed: 'Falhou'
        }
        return (
          <span className={clsx('px-3 py-1 rounded-full text-xs font-medium', styles[value as keyof typeof styles])}>
            {labels[value as keyof typeof labels]}
          </span>
        )
      }
    },
    {
      key: 'category' as const,
      label: 'Categoria',
      sortable: true
    },
    {
      key: 'date' as const,
      label: 'Data',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(value).toLocaleDateString('pt-BR')}
        </span>
      )
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Título com Gradiente */}
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-brand rounded-xl shadow-brand">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Dashboard Elite</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {apiConnected ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Conectado ao banco de dados MySQL
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  Usando dados de demonstração
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Métricas com Dados Reais da API */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Receita Total"
          value={metrics ? `R$ ${(metrics.total_vendas / 1000).toFixed(1)}k` : 'R$ 0'}
          change={metrics?.crescimento_percentual || 0}
          icon={DollarSign}
          gradient="from-green-500 to-emerald-600"
          loading={loading}
        />
        <MetricCard
          title="Lucro Líquido"
          value={metrics ? `R$ ${(metrics.total_lucro / 1000).toFixed(1)}k` : 'R$ 0'}
          change={metrics?.margem_lucro || 0}
          icon={TrendingUp}
          gradient="from-brand-500 to-brand-600"
          loading={loading}
        />
        <MetricCard
          title="Total Gastos"
          value={metrics ? `R$ ${(metrics.total_gastos / 1000).toFixed(1)}k` : 'R$ 0'}
          change={-2.4}
          icon={Users}
          gradient="from-accent-500 to-accent-600"
          loading={loading}
        />
        <MetricCard
          title="Margem de Lucro"
          value={metrics ? `${metrics.margem_lucro.toFixed(1)}%` : '0%'}
          change={15.3}
          icon={ShoppingCart}
          gradient="from-orange-500 to-orange-600"
          loading={loading}
        />
      </div>

      {/* Gráficos com Glassmorphism */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Linha Premium */}
        <div className="glass-dark rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold gradient-text">
              Evolução Mensal
            </h3>
            <div className="px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-lg text-sm font-medium">
              +18.2%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <defs>
                <linearGradient id="vendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="lucro" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  color: '#fff'
                }}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="vendas" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 4 }}
                activeDot={{ r: 6, fill: '#8b5cf6' }}
                fill="url(#vendas)"
              />
              <Line 
                type="monotone" 
                dataKey="lucro" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ fill: '#ec4899', r: 4 }}
                activeDot={{ r: 6, fill: '#ec4899' }}
                fill="url(#lucro)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pizza Premium */}
        <div className="glass-dark rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold gradient-text">
              Distribuição por Categoria
            </h3>
            <div className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-lg text-sm font-medium">
              4 Categorias
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                stroke="none"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Cards Premium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 border-2 border-green-200/50 dark:border-green-800/50 hover:border-green-400/50 dark:hover:border-green-600/50 transition-all hover:-translate-y-1 hover:shadow-glow-lg group">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-glow group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Completos</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border-2 border-yellow-200/50 dark:border-yellow-800/50 hover:border-yellow-400/50 dark:hover:border-yellow-600/50 transition-all hover:-translate-y-1 hover:shadow-glow-lg group">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-glow group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pendentes</p>
              <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                {transactions.filter(t => t.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border-2 border-red-200/50 dark:border-red-800/50 hover:border-red-400/50 dark:hover:border-red-600/50 transition-all hover:-translate-y-1 hover:shadow-glow-lg group">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-glow group-hover:scale-110 transition-transform">
              <XCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Falharam</p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-300">
                {transactions.filter(t => t.status === 'failed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Transações Premium */}
      <div className="glass-dark rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold gradient-text">
            Transações Recentes
          </h3>
          <div className="px-4 py-2 bg-gradient-brand text-white rounded-xl text-sm font-medium shadow-brand hover:scale-105 transition-transform cursor-pointer">
            Ver Todas
          </div>
        </div>
        <Table 
          data={transactions} 
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  )
}
