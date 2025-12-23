import { useState } from 'react'
import { useThemeStore } from '../store/themeStore'
import { Moon, Sun, Bell, Shield, User } from 'lucide-react'
import Button from '../components/Button'

export default function Settings() {
  const { theme, toggleTheme } = useThemeStore()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  })

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configurações</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Personalize sua experiência
        </p>
      </div>

      {/* Tema */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          {theme === 'dark' ? (
            <Moon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          ) : (
            <Sun className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          )}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Aparência
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Escolha o tema da interface
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => theme === 'dark' && toggleTheme()}
            className={`flex-1 p-4 border-2 rounded-lg transition-all ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="font-medium text-gray-900 dark:text-white">Claro</p>
          </button>
          <button
            onClick={() => theme === 'light' && toggleTheme()}
            className={`flex-1 p-4 border-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            <Moon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="font-medium text-gray-900 dark:text-white">Escuro</p>
          </button>
        </div>
      </div>

      {/* Notificações */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notificações
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">E-mail</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receber notificações por e-mail
              </p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.email ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.email ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Push</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receber notificações push no navegador
              </p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.push ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.push ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">SMS</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receber notificações por SMS
              </p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.sms ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.sms ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Segurança
          </h3>
        </div>
        <div className="space-y-4">
          <Button variant="secondary" className="w-full sm:w-auto">
            Alterar Senha
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto ml-0 sm:ml-4">
            Autenticação de Dois Fatores
          </Button>
        </div>
      </div>

      {/* Perfil */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Perfil
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome
            </label>
            <input
              type="text"
              defaultValue="Administrador"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              E-mail
            </label>
            <input
              type="email"
              defaultValue="admin@exemplo.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <Button variant="primary">
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  )
}
