import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BarChart3, 
  Package,
  Users, 
  Settings,
  Sparkles
} from 'lucide-react'
import { clsx } from 'clsx'

interface SidebarProps {
  isOpen: boolean
}

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/products', icon: Package, label: 'Produtos' },
  { path: '/users', icon: Users, label: 'Usuários' },
  { path: '/settings', icon: Settings, label: 'Configurações' }
]

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside 
      className={clsx(
        'fixed left-0 top-0 h-full backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 z-40',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className={clsx(
          'flex items-center gap-3 transition-all duration-300',
          !isOpen && 'opacity-0'
        )}>
          <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center shadow-brand relative group hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-white animate-pulse-glow" />
            <div className="absolute inset-0 bg-gradient-brand rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </div>
          {isOpen && (
            <span className="text-xl font-bold gradient-text animate-fade-in">
              Dashboard
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{ animationDelay: `${index * 50}ms` }}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden animate-slide-right',
              isActive 
                ? 'bg-gradient-brand text-white shadow-brand' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400'
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-brand opacity-20 blur-xl"></div>
                )}
                <item.icon className={clsx(
                  'w-5 h-5 flex-shrink-0 relative z-10 transition-transform group-hover:scale-110',
                  isActive && 'animate-pulse-glow'
                )} />
                {isOpen && (
                  <span className="font-medium relative z-10">{item.label}</span>
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity rounded-xl"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Version Info */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4 animate-fade-in">
          <div className="glass px-4 py-3 rounded-xl text-center">
            <p className="text-xs font-medium text-brand-600 dark:text-brand-400">
              Dashboard Pro
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              v2.0.0 Elite
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}
