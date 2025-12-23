import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings,
  Moon,
  LogOut
} from 'lucide-react'
import { useThemeStore } from '../store/themeStore'
import { useAuthStore } from '../store/authStore'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const commands = [
  { id: 'dashboard', label: 'Ir para Dashboard', icon: LayoutDashboard, action: '/dashboard' },
  { id: 'analytics', label: 'Ir para Analytics', icon: BarChart3, action: '/analytics' },
  { id: 'users', label: 'Ir para Usuários', icon: Users, action: '/users' },
  { id: 'settings', label: 'Ir para Configurações', icon: Settings, action: '/settings' },
  { id: 'theme', label: 'Alternar Tema', icon: Moon, action: 'toggle-theme' },
  { id: 'logout', label: 'Sair', icon: LogOut, action: 'logout' },
]

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()
  const { toggleTheme } = useThemeStore()
  const { logout } = useAuthStore()

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected(prev => (prev + 1) % filteredCommands.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        handleCommand(filteredCommands[selected])
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selected, filteredCommands])

  const handleCommand = (command: typeof commands[0]) => {
    if (command.action === 'toggle-theme') {
      toggleTheme()
    } else if (command.action === 'logout') {
      logout()
      navigate('/login')
    } else {
      navigate(command.action)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Command Palette */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-in border border-brand-200 dark:border-brand-800">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-brand-500" />
          <input
            type="text"
            placeholder="Digite um comando ou pesquise..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSelected(0)
            }}
            autoFocus
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
          />
          <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              Nenhum comando encontrado
            </div>
          ) : (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                onClick={() => handleCommand(command)}
                onMouseEnter={() => setSelected(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  selected === index
                    ? 'bg-gradient-brand text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <command.icon className="w-5 h-5" />
                <span className="font-medium">{command.label}</span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
            <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
              ↑↓
            </kbd>
            <span>navegar</span>
            <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
              Enter
            </kbd>
            <span>selecionar</span>
          </div>
          <div className="text-xs text-gray-400">
            Press{' '}
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 text-brand-600">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
