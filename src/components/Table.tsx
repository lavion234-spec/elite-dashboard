import { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import type { Transaction } from '../store/dashboardStore'

interface Column {
  key: keyof Transaction
  label: string
  sortable?: boolean
  render?: (value: any, row: Transaction) => React.ReactNode
}

interface TableProps {
  data: Transaction[]
  columns: Column[]
  loading?: boolean
}

export default function Table({ data, columns, loading = false }: TableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<keyof Transaction | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const itemsPerPage = 10

  // Filtrar e ordenar dados
  const processedData = useMemo(() => {
    let filtered = [...data]

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Filtro de status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(row => row.status === statusFilter)
    }

    // Ordenação
    if (sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[sortBy]
        const bVal = b[sortBy]
        
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, searchTerm, sortBy, sortOrder, statusFilter])

  // Paginação
  const totalPages = Math.ceil(processedData.length / itemsPerPage)
  const paginatedData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (key: keyof Transaction) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortOrder('asc')
    }
  }

  if (loading) {
    return (
      <div className="backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-glow overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-xl bg-transparent rounded-2xl overflow-hidden animate-fade-in">
      {/* Controles Premium */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-transparent via-brand-50/5 to-transparent dark:via-brand-900/5">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          {/* Busca Premium */}
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
            <input
              type="text"
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm dark:text-white transition-all hover:shadow-glow"
            />
          </div>

          {/* Filtro de Status Premium */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="px-5 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm dark:text-white transition-all hover:shadow-glow cursor-pointer font-medium"
          >
            <option value="all">Todos os Status</option>
            <option value="completed">Completo</option>
            <option value="pending">Pendente</option>
            <option value="failed">Falhou</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600'
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortBy === column.key && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  Nenhum resultado encontrado
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : <span className="text-sm text-gray-900 dark:text-white">{String(row[column.key])}</span>
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} até {Math.min(currentPage * itemsPerPage, processedData.length)} de {processedData.length} resultados
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={clsx(
                  'px-4 py-2 rounded-lg transition-colors',
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
