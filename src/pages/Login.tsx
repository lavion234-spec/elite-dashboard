import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Mail, Lock, Sparkles } from 'lucide-react'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-accent-50 to-brand-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efeitos de Fundo Animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-brand rounded-full blur-3xl opacity-20 animate-pulse-glow"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-accent-500 to-accent-600 rounded-full blur-3xl opacity-20 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card Premium */}
        <div className="glass-dark rounded-3xl shadow-glow-lg p-10 animate-scale-in border-2 border-white/20 dark:border-gray-700/50">
          {/* Logo Premium */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-brand rounded-3xl flex items-center justify-center shadow-brand group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-white animate-pulse-glow" />
              </div>
              <div className="absolute inset-0 bg-gradient-brand rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
          </div>

          {/* Título Premium */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold gradient-text mb-3 animate-fade-in">
              Dashboard Elite
            </h1>
            <p className="text-gray-600 dark:text-gray-400 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Acesse a experiência premium de gestão
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Mail className="absolute left-4 top-11 w-5 h-5 text-brand-400" />
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12"
              />
            </div>

            <div className="relative animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Lock className="absolute left-4 top-11 w-5 h-5 text-brand-400" />
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-12"
              />
            </div>

            {error && (
              <div className="p-4 glass rounded-xl border-2 border-red-300 dark:border-red-700 text-sm text-red-600 dark:text-red-400 animate-shake">
                <strong>Erro:</strong> {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-gradient-brand hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 text-white font-semibold py-4 rounded-xl border-0 animate-slide-up"
              style={{ animationDelay: '400ms' }}
              loading={loading}
            >
              {loading ? 'Entrando...' : 'Entrar com Estilo ✨'}
            </Button>
          </form>

          {/* Demo Info Premium */}
          <div className="mt-8 p-5 glass rounded-2xl border border-brand-200 dark:border-brand-800 animate-slide-up" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                <span className="text-lg">💡</span>
              </div>
              <p className="text-sm font-bold gradient-text">
                Credenciais de Demonstração
              </p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 ml-11">
              Use <strong>qualquer e-mail e senha</strong> para acessar a experiência completa
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Dashboard Administrativo © 2024
        </p>
      </div>
    </div>
  )
}
