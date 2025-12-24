import { create } from 'zustand'
import api from '../services/api'

// ============================================
// TIPOS E INTERFACES
// ============================================

export interface Product {
  id: number
  nome: string
  descricao: string
  preco: number
  custo: number
  estoque: number
  categoria_id: number | null
  imagem: string | null
  created_at: string
}

export interface TopProduct {
  produto_id: number
  produto_nome: string
  total_vendido: number
  quantidade_total: number
}

export interface ProductFormData {
  nome: string
  descricao: string
  preco: number
  custo: number
  estoque: number
  categoria_id: number | null
  imagem: string | null
}

interface ProductsState {
  // Estado
  products: Product[]
  topProducts: TopProduct[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
  
  // Ações
  fetchProducts: () => Promise<void>
  fetchTopProducts: () => Promise<void>
  createProduct: (data: ProductFormData) => Promise<Product>
  updateProduct: (id: number, data: Partial<ProductFormData>) => Promise<Product>
  deleteProduct: (id: number) => Promise<void>
  setSelectedProduct: (product: Product | null) => void
  clearError: () => void
}

// ============================================
// STORE DE PRODUTOS
// ============================================

export const useProductsStore = create<ProductsState>((set) => ({
  // Estado inicial
  products: [],
  topProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,

  // Buscar todos os produtos
  fetchProducts: async () => {
    try {
      set({ loading: true, error: null })
      const products = await api.products.getAll()
      set({ products, loading: false })
    } catch (error: any) {
      console.error('Erro ao buscar produtos:', error)
      set({ 
        error: error.message || 'Erro ao buscar produtos', 
        loading: false 
      })
    }
  }, 

  // Buscar top 5 produtos mais vendidos
  fetchTopProducts: async () => {
    try {
      set({ loading: true, error: null })
      const topProducts = await api.dashboard.getTopProducts()
      set({ topProducts, loading: false })
    } catch (error: any) {
      console.error('Erro ao buscar top produtos:', error)
      set({ 
        error: error.message || 'Erro ao buscar top produtos', 
        loading: false,
        topProducts: []
      })
    }
  },

  // Criar novo produto
  createProduct: async (data: ProductFormData) => {
    try {
      set({ loading: true, error: null })
      const result = await api.products.create(data)
      
      // Não adicionar manualmente, deixar fetchProducts() atualizar
      set({ loading: false })
      
      return result
    } catch (error: any) {
      console.error('Erro ao criar produto:', error)
      set({ 
        error: error.message || 'Erro ao criar produto', 
        loading: false 
      })
      throw error
    }
  },

  // Atualizar produto existente
  updateProduct: async (id: number, data: Partial<ProductFormData>) => {
    try {
      set({ loading: true, error: null })
      const result = await api.products.update(id, data)
      
      // Não atualizar manualmente, deixar fetchProducts() atualizar
      set({ 
        loading: false,
        selectedProduct: null
      })
      
      return result
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error)
      set({ 
        error: error.message || 'Erro ao atualizar produto', 
        loading: false 
      })
      throw error
    }
  },

  // Deletar produto
  deleteProduct: async (id: number) => {
    try {
      set({ loading: true, error: null })
      await api.products.delete(id)
      
      // Remover da lista
      set(state => ({
        products: state.products.filter(p => p.id !== id),
        loading: false,
        selectedProduct: null
      }))
    } catch (error: any) {
      console.error('Erro ao deletar produto:', error)
      set({ 
        error: error.message || 'Erro ao deletar produto', 
        loading: false 
      })
      throw error
    }
  },

  // Selecionar produto para edição
  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product })
  },

  // Limpar erro
  clearError: () => {
    set({ error: null })
  }
}))
