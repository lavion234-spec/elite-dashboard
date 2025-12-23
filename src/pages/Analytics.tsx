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

const productData = [
  { produto: 'Produto A', vendas: 4500 },
  { produto: 'Produto B', vendas: 3800 },
  { produto: 'Produto C', vendas: 3200 },
  { produto: 'Produto D', vendas: 2900 },
  { produto: 'Produto E', vendas: 2400 },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Análises detalhadas e insights
        </p>
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

        {/* Gráfico de Barras Horizontal - Produtos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top 5 Produtos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis type="number" className="text-gray-600 dark:text-gray-400" />
              <YAxis dataKey="produto" type="category" className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="vendas" fill="#f59e0b" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
