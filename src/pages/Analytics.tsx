import { useEffect } from 'react'
import { useProductsStore } from '../store/productsStore'
import { 
  BarChart, 
  Bar, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { TrendingUp, Package } from 'lucide-react'

const monthlyData = [
  { month: 'Jan', receita: 12000, despesas: 8000, lucro: 4000 },
  { month: 'Fev', receita: 15000, despesas: 9000, lucro: 6000 },
  { month: 'Mar', receita: 18000, despesas: 11000, lucro: 7000 },
  { month: 'Abr', receita: 14000, despesas: 10000, lucro: 4000 },
  { month: 'Mai', receita: 22000, despesas: 13000, lucro: 9000 },
  { month: 'Jun', receita: 25000, despesas: 15000, lucro: 10000 },
]

const weeklyData = [
  { day: 'Seg', usuarios: 120 },
  { day: 'Ter', usuarios: 150 },
  { day: 'Qua', usuarios: 180 },
  { day: 'Qui', usuarios: 170 },
  { day: 'Sex', usuarios: 200 },
  { day: 'Sáb', usuarios: 90 },
  { day: 'Dom', usuarios: 85 },
]

export default function Analytics() {
  const { topProducts, fetchTopProducts, loading } = useProductsStore()

  useEffect(() => {
    fetchTopProducts()
  }, [fetchTopProducts])

  // Converter top products para formato do gráfico
  const productChartData = topProducts.map(p => ({
    produto: p.produto_nome,
    vendas: p.total_vendido
  }))

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/50">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Análises detalhadas e insights do negócio
          </p>
        </div>
      </div>

      {/* Gráfico de Barras - Receita vs Despesas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Receita vs Despesas (Mensal)
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Bar dataKey="receita" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="despesas" fill="#ef4444" radius={[8, 8, 0, 0]} />
            <Bar dataKey="lucro" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Área - Usuários Semanais */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Usuários Ativos (Semanal)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="day" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="usuarios" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras Horizontal - Top 5 Produtos do MySQL */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top 5 Produtos Mais Vendidos
              </h3>
            </div>
            {loading && (
              <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          {productChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis type="number" className="text-gray-600 dark:text-gray-400" />
                <YAxis 
                  dataKey="produto" 
                  type="category" 
                  className="text-gray-600 dark:text-gray-400"
                  width={120}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Total Vendido']}
                />
                <Bar dataKey="vendas" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhum produto vendido ainda</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards de Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h4 className="text-sm font-medium opacity-90 mb-2">Taxa de Conversão</h4>
          <p className="text-3xl font-bold mb-1">18.5%</p>
          <p className="text-sm opacity-75">+2.3% vs mês anterior</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h4 className="text-sm font-medium opacity-90 mb-2">Ticket Médio</h4>
          <p className="text-3xl font-bold mb-1">R$ 247,00</p>
          <p className="text-sm opacity-75">+R$ 12 vs mês anterior</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h4 className="text-sm font-medium opacity-90 mb-2">ROI</h4>
          <p className="text-3xl font-bold mb-1">324%</p>
          <p className="text-sm opacity-75">+45% vs mês anterior</p>
        </div>
      </div>
    </div>
  )
}
