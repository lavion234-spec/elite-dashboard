import { LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  gradient?: string
  loading?: boolean
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  gradient = 'from-brand-500 to-brand-600',
  loading = false 
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value

  useEffect(() => {
    if (!loading && typeof numericValue === 'number' && !isNaN(numericValue)) {
      let start = 0
      const duration = 1000
      const increment = numericValue / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= numericValue) {
          setDisplayValue(numericValue)
          clearInterval(timer)
        } else {
          setDisplayValue(start)
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [numericValue, loading])

  if (loading) {
    return (
      <div className="glass-dark rounded-2xl p-6 animate-pulse-glow relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg skeleton w-24 mb-3"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg skeleton w-32"></div>
          </div>
          <div className="p-4 rounded-xl bg-gray-300 dark:bg-gray-700 w-14 h-14 skeleton"></div>
        </div>
      </div>
    )
  }

  const formattedValue = typeof value === 'string' ? value : Math.round(displayValue).toLocaleString('pt-BR')

  return (
    <div className="glass-dark rounded-2xl p-6 hover:shadow-glow-lg transition-all duration-300 group relative overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-400/50 dark:hover:border-brand-500/50 hover:-translate-y-1">
      {/* Gradient Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-all">
            {formattedValue}
          </h3>
          {change !== undefined && (
            <div className={clsx(
              'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium',
              change >= 0 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            )}>
              <span className="text-base">{change >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        
        <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-brand group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <Icon className="w-7 h-7 text-white relative z-10" />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
        </div>
      </div>
    </div>
  )
}
