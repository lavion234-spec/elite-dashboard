import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulação de autenticação
        if (email && password) {
          const fakeToken = btoa(`${email}:${password}:${Date.now()}`)
          const fakeUser = {
            id: '1',
            name: 'Administrador',
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random`
          }

          set({
            user: fakeUser,
            token: fakeToken,
            isAuthenticated: true
          })
        } else {
          throw new Error('Credenciais inválidas')
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
