import { Menu, Moon, Sun, Bell, LogOut, Search } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'

interface HeaderProps {
  onMenuClick: () => void
  onCommandPalette: () => void
}

export default function Header({ onMenuClick, onCommandPalette }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore()
  const { user, logout } = useAuthStore()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="h-16 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl transition-all hover:scale-105 group"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
        </button>

        <h1 className="text-xl font-bold gradient-text hidden sm:block">
          Dashboard Pro
        </h1>
      </div>

      {/* Center - Command Palette Trigger */}
      <button
        onClick={onCommandPalette}
        className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl transition-all hover:shadow-brand group border border-gray-200 dark:border-gray-700"
      >
        <Search className="w-4 h-4 text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400" />
        <span className="text-sm text-gray-600 dark:text-gray-400">Buscar...</span>
        <kbd className="px-2 py-1 text-xs bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600 text-brand-600 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl transition-all hover:scale-105 hover:shadow-glow group relative"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-500 transition-colors group-hover:rotate-180 duration-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 group-hover:text-brand-600 transition-colors group-hover:-rotate-12 duration-300" />
          )}
        </button>

        {/* Notifications */}
        <button className="p-2.5 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl transition-all hover:scale-105 group relative">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors group-hover:animate-bounce-subtle" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-brand rounded-full animate-pulse-glow"></span>
        </button>

        {/* User Menu */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1.5 pr-3 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl transition-all hover:shadow-brand group"
          >
            <div className="relative">
              <img
                src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
                alt={user?.name}
                className="w-9 h-9 rounded-xl ring-2 ring-brand-400/20 group-hover:ring-brand-400/50 transition-all"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-2 animate-scale-in overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  logout()
                  setShowUserMenu(false)
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

